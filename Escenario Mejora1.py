from datetime import datetime
from typing import Protocol, Dict

# Abstracciones
class DataSource(Protocol):
    def get_data(self) -> Dict: ...

class Formatter(Protocol):
    def format(self, data: Dict) -> str: ...

class Output(Protocol):
    def write(self, content: str) -> None: ...

# Implementaciones
class InMemorySalesData(DataSource):
    def get_data(self) -> Dict:
        return {"ventas": 1200, "fecha": str(datetime.now())}

class SimpleTextFormatter(Formatter):
    def format(self, data: Dict) -> str:
        return f"REPORTE: ventas={data['ventas']} fecha={data['fecha']}"

class FileOutput(Output):
    def write(self, content: str) -> None:
        with open("reporte.txt", "w", encoding="utf-8") as f:
            f.write(content)

class ConsoleOutput(Output):
    def write(self, content: str) -> None:
        print(content)

# Orquestador
class ReportService:
    def __init__(self, source: DataSource, formatter: Formatter, output: Output):
        self.source, self.formatter, self.output = source, formatter, output

    def run_report(self):
        data = self.source.get_data()
        text = self.formatter.format(data)
        self.output.write(text)
        return text

if __name__ == "__main__":
    ReportService(InMemorySalesData(), SimpleTextFormatter(), ConsoleOutput()).run_report()
