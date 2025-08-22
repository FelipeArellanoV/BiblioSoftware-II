from abc import ABC, abstractmethod

# Abstracción
class PaymentMethod(ABC):
    @abstractmethod
    def process(self, amount: float) -> None: ...

# Implementaciones
class CashPayment(PaymentMethod):
    def process(self, amount: float) -> None:
        print(f"Efectivo: {amount:.2f}")

class CardPayment(PaymentMethod):
    def process(self, amount: float) -> None:
        print(f"Tarjeta: {amount:.2f}")

class TransferPayment(PaymentMethod):
    def process(self, amount: float) -> None:
        print(f"Transferencia: {amount:.2f}")

# Procesador (depende de abstracciones)
class PaymentProcessor:
    def __init__(self, methods: dict[str, PaymentMethod]):
        self._methods = methods

    def process(self, payment_type: str, amount: float):
        method = self._methods.get(payment_type)
        if not method:
            raise ValueError("Tipo no soportado")
        method.process(amount)

if __name__ == "__main__":
    processor = PaymentProcessor({
        "cash": CashPayment(),
        "card": CardPayment(),
        "transfer": TransferPayment()
    })
    processor.process("card", 100.0)
