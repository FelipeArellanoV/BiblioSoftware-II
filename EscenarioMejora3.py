from typing import Protocol

class Shape(Protocol):
    def area(self) -> int: ...

class Rectangle(Shape):
    def __init__(self, width: int, height: int):
        self._w = width
        self._h = height

    def area(self) -> int:
        return self._w * self._h

class Square(Shape):
    def __init__(self, side: int):
        self._s = side

    def area(self) -> int:
        return self._s * self._s

def compute_area(shape: Shape) -> int:
    return shape.area()

if __name__ == "__main__":
    print(compute_area(Rectangle(5, 10)))  # 50
    print(compute_area(Square(10)))        # 100
