import json
from datetime import datetime

class ReportManager:
    def run_report(self):
        # cargar datos
        data = {"ventas": 1200, "fecha": str(datetime.now())}

        # formatear
        text = f"REPORTE: ventas={data['ventas']} fecha={data['fecha']}"

        # persistir
        with open("reporte.txt", "w", encoding="utf-8") as f:
            f.write(text)

        # presentar
        print(text)

if __name__ == "__main__":
    ReportManager().run_report()
