import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface ChecklistItem {
  id: string;
  text: string;
  subtext?: string;
  activeFromLocalFrame: number;
  imageSrc: string;
}

export interface ChecklistCardProps {
  title: string;
  subtitle?: string;
  items: ChecklistItem[];
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  title,
  subtitle,
  items,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find currently focused item for image preview
  let focusedItem: ChecklistItem | undefined = undefined;
  for (let i = items.length - 1; i >= 0; i--) {
    if (frame >= items[i].activeFromLocalFrame) {
      focusedItem = items[i];
      break;
    }
  }
  if (!focusedItem) focusedItem = items[0];

  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        width: '700px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
      }}
    >
      {/* Ceja Cromática Superior Cuatricolor Oficial de EducaPlay */}
      <RainbowEyebrow />

      {/* Cabecera Limpia (blanca) */}
      <div
        style={{
          padding: '22px 28px 16px',
          borderBottom: '1.5px solid rgba(7, 32, 44, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: THEME.surface,
        }}
      >
        <div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: THEME.ink,
              fontFamily: THEME.fonts.title,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: THEME.accentDeep,
                marginTop: '4px',
                fontFamily: THEME.fonts.body,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Main Body: List + Dynamic Preview */}
      <div
        style={{
          display: 'flex',
          padding: '20px 24px',
          gap: '18px',
          backgroundColor: THEME.surface,
        }}
      >
        {/* Left column: Items with Triple Emphasis */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {items.map((item, idx) => {
            const isActive = frame >= item.activeFromLocalFrame;
            const itemLocalFrame = Math.max(0, frame - item.activeFromLocalFrame);
            const itemSpr = spring({
              frame: itemLocalFrame,
              fps,
              config: { damping: 12, stiffness: 120 },
            });
            const itemScale = isActive
              ? interpolate(itemSpr, [0, 1], [0.97, 1])
              : 1;

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: isActive ? '12px 16px' : '10px 14px',
                  borderRadius: '14px',
                  backgroundColor: isActive
                    ? THEME.emphasisBg
                    : 'rgba(7, 32, 44, 0.03)',
                  borderLeft: isActive
                    ? `6px solid ${THEME.accent}`
                    : '1px solid rgba(7, 32, 44, 0.08)',
                  borderTop: isActive ? '1px solid rgba(7, 32, 44, 0.1)' : '1px solid rgba(7, 32, 44, 0.08)',
                  borderRight: isActive ? '1px solid rgba(7, 32, 44, 0.1)' : '1px solid rgba(7, 32, 44, 0.08)',
                  borderBottom: isActive ? '1px solid rgba(7, 32, 44, 0.1)' : '1px solid rgba(7, 32, 44, 0.08)',
                  transform: `scale(${itemScale})`,
                  opacity: isActive ? 1 : 0.45,
                  boxShadow: isActive ? '0 4px 14px rgba(255, 246, 196, 0.6)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? THEME.accent : '#D0DDD7',
                    color: isActive ? '#FFFFFF' : THEME.ink,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: THEME.fonts.body,
                    flexShrink: 0,
                  }}
                >
                  {isActive ? '✓' : idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: isActive ? 800 : 600,
                      color: THEME.ink,
                      fontFamily: THEME.fonts.body,
                      lineHeight: 1.25,
                      borderBottom: isActive ? `2px solid ${THEME.accent}` : 'none',
                      display: 'inline-block',
                    }}
                  >
                    {item.text}
                  </div>
                  {item.subtext && isActive && (
                    <div
                      style={{
                        fontSize: '20px',
                        color: THEME.accentDeep,
                        fontWeight: 700,
                        marginTop: '3px',
                        fontFamily: THEME.fonts.body,
                      }}
                    >
                      {item.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Dynamic Preview of active item */}
        {focusedItem && focusedItem.imageSrc && (
          <div
            style={{
              width: '190px',
              height: '240px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F3F6F5',
              border: THEME.border,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(7, 32, 44, 0.08)',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile(focusedItem.imageSrc)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '12px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
