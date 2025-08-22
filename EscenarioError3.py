class Rectangle:
    def __init__(self):
        self._w = 0
        self._h = 0

    def set_width(self, w: int):
        self._w = w

    def set_height(self, h: int):
        self._h = h

    def area(self) -> int:
        return self._w * self._h

class Square(Rectangle):
    def set_width(self, w: int):
        self._w = w
        self._h = w

    def set_height(self, h: int):
        self._h = h
        self._w = h

def compute_area(rect: Rectangle) -> int:
    rect.set_width(5)
    rect.set_height(10)  # en Square cambia ambos lados
    return rect.area()
