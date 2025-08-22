class PaymentProcessor:
    def process(self, payment_type: str, amount: float):
        if payment_type == "cash":
            print(f"Efectivo: {amount}")
        elif payment_type == "card":
            print(f"Tarjeta: {amount}")
        elif payment_type == "transfer":
            print(f"Transferencia: {amount}")
        else:
            raise ValueError("Tipo no soportado")

if __name__ == "__main__":
    PaymentProcessor().process("card", 100.0)
