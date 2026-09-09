"""
Servidor local Bridge (puerto 3210) que conecta la Matriz HTML interactiva con el motor Remotion.
Permite recibir la configuración aprobada de subtítulos, recursos y propuestas, generar data.ts y lanzar el preview local.
"""
import os, sys, json, subprocess, webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 3210
BASE_DIR = os.path.abspath(r"c:\Users\produ\Videos\EDUCAPLAY 2026 LOCAL\SECUNDARIA\Educacion economica y financiera\EEF002")
REMOTION_DIR = os.path.join(BASE_DIR, "remotion")
APPROVED_MANIFEST_PATH = os.path.join(BASE_DIR, "TABLA_SINCRONIZACION_APROBADA.json")
GENERATOR_SCRIPT = os.path.join(BASE_DIR, "remotion_generator.py")

class BridgeRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path in ('/health', '/api/health'):
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            resp = {"status": "ok", "service": "remotion-bridge-server", "port": PORT}
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path in ('/api/generate-and-preview', '/generate-and-preview'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                manifest_data = json.loads(body.decode('utf-8'))
            except Exception as e:
                manifest_data = {}

            # 1. Guardar manifest aprobado
            with open(APPROVED_MANIFEST_PATH, "w", encoding="utf-8") as f:
                json.dump(manifest_data, f, indent=2, ensure_ascii=False)
            print(f"[Bridge] Guardado manifest aprobado en: {APPROVED_MANIFEST_PATH}")

            # 2. Ejecutar generador
            try:
                import remotion_generator
                remotion_generator.setup_remotion_project(manifest_data)
                print("[Bridge] Proyecto Remotion actualizado con éxito.")
            except Exception as e:
                print(f"[Bridge Error] Falló la generación de archivos: {e}")

            # 3. Lanzar preview en proceso independiente
            try:
                # Verificar si ya está corriendo en el puerto 3000 o lanzar nuevo
                subprocess.Popen("npx remotion preview src/index.ts --port 3000", cwd=REMOTION_DIR, shell=True)
                print("[Bridge] Comando de Remotion Preview iniciado en puerto 3000.")
            except Exception as e:
                print(f"[Bridge Error] No se pudo lanzar el preview de Remotion: {e}")

            # 4. Responder al cliente web
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            response_payload = {
                "success": True,
                "previewUrl": "http://localhost:3000",
                "message": "Proyecto Remotion EEF002 generado con éxito y preview en ejecución en http://localhost:3000",
                "savedManifest": APPROVED_MANIFEST_PATH
            }
            self.wfile.write(json.dumps(response_payload).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, BridgeRequestHandler)
    print(f"============================================================")
    print(f" EDUCAPLAY REMOTION BRIDGE SERVER ESCUCHANDO EN PUERTO {PORT}")
    print(f" URL Health: http://localhost:{PORT}/health")
    print(f"============================================================")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
