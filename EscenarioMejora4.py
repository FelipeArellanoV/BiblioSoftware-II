from typing import Protocol

# Interfaces segregadas
class Workable(Protocol):
    def work(self) -> None: ...

class Eatable(Protocol):
    def eat(self) -> None: ...

class Attendee(Protocol):
    def attend_meeting(self) -> None: ...

# Implementaciones
class Robot(Workable):
    def work(self) -> None:
        print("Produciendo (robot)")

class Human(Workable, Eatable, Attendee):
    def work(self) -> None:
        print("Trabajando (humano)")
    def eat(self) -> None:
        print("Almorzando")
    def attend_meeting(self) -> None:
        print("Asistiendo a reunión")

class MeetingBot(Attendee):
    def attend_meeting(self) -> None:
        print("Transcribiendo reunión")

# Clientes dependen de la mínima interfaz
def run_shift(worker: Workable): worker.work()
def lunch_break(person: Eatable): person.eat()
def schedule(meeting: Attendee): meeting.attend_meeting()
