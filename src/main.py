# -*- coding: utf-8 -*-
from __future__ import annotations

def hello(name: str = "world") -> str:
    return f"hello, {name}"

def main() -> int:
    print(hello())
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
