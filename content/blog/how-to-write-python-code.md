---
title: "How to write good quality Python code that would pass code checks."
date: 2025-12-22
draft: true
tags: ["Python", "Coding Standard"]
---
## Why Restraining Ourselves with Coding Standards? Let My Python Be Free!
Writing **standard-compliant** Python code and ensuring it passes automated checks improves readability, reliability, and long-term maintainability by making behavior predictable and easier for others (and tools) to reason about. Adhering to established conventions and validations also reduces defects, simplifies collaboration, and enables seamless integration with linters, test frameworks, and CI/CD pipelines.

This discipline is especially important in **dynamically typed** languages like Python. Without clear standards, documentation, and type annotations, code becomes difficult to maintain— and even harder for your colleagues to debug the issues you introduced but can no longer fix. Python relies heavily on **duck typing**, which provides flexibility but can obscure the true sources of errors unless the possible typing of variables are explicitly constrained and communicated.

## Basic Intro to Typing
Here are the common typing-related stuffs you'd need to know.
```python
from types import MappingProxyType
from typing import Any, Callable, Mapping, Optional, Union
```
- [PEP 3107] From **Python 3.0**, function annotations are introduced, it's nothing new and not writing it does not improve backward compatibility somehow, please-please do write them...
- [PEP 416] From **Python 3.3**, a `MappingProxyType` is added to `types` module, providing support for immutable mapping (like a frozen dict).
- [PEP 484] From **Python 3.5**, `typing` module was introduced, establishing a standard for how to do typing.
- [PEP 585] From **Python 3.9**, built-in collections are now type hinting generics, and preferred over `typing.Dict/List/Set/Tuple/...`.
- [PEP 604] From **Python 3.10**, pipe symbol `|` can represent `Union`, so `Union[int, float, str]` may be written as `int | float | str`.

When a variable / argument can be of multiple possible types, use `Union`:
```python
var_x: int | float = 0  # Valid syntax since Python 3.10+
def func(arg_x: Union[int, float]) -> float:
    ...
```

When a variable / argument can be of a certain type or `None`, use `Optional` (quite useful if you want an argument to have a default value but it's a mutable object):
```python
var_x: Optional[dict[str, Any]] = None
def func(arg_x: Optional[dict[str, Any]] = None):
    if arg_x is None:
        arg_x = dict(...)  # Set the default value
    ...
```

About why mutable objects should not be set for default values of arguments, see this code snippet:
```python
from typing import Any

def add_item(item: Any, items: list = []) -> list:
    items.append(item)
    return items

for i in range(3):
    print(add_item(i))  # Outputs: [0] [0, 1] [0, 1, 2]
```

## Automated Tools
There are four tools that are our best friends when it comes to write good quality, standard-compliant Python code, two for automatic formatting (`black` & `isort`) and two for code checking (`pylint` & `mypy`). By experience, 10-30% of code check issues can be fixed automatically by simply running `black` and `isort`.

Before committing, to format your code, simply run:
```bash
isort --profile black --line-length 120 your/code/path/
black --line-length 120 your/code/path/
```

And during development please frequently check your code with:
```bash
pylint your/code/path/
mypy your/code/path/
```

It is sometimes okay to ignore certain `mypy` errors, but always try to please `pylint`. Here are my example configurations: [.pylintrc](/files/.pylintrc) & [mypy.ini](/files/mypy.ini).

> Note that `your/code/path/` doesn't have to be a specific directory, globstar pattern like `your/code/path/**/*keyword*/**/*.py` would also work assuming your shell supports it.

## Common Issues

### Output
#### 1. No `print` in production code
You shouldn't be using `print` in production code, use some logger.

#### 2. No f-string without `{...}`
If an f-string has no `{...}`, make it a normal string!

#### 3. Logging f-string with logger
Unlike C-style formatting (with `%` signs), f-string's formatting is always evaluated, which means that even when a log will not be outputted (like `DEBUG` logs when logger level is set to `INFO`), its string formatting is always evaluated.
Bad Example:
```python
logger.debug(f"Model {model}: output {len(result)} candidates")
```
Change it to this:
```python
logger.debug("Model %r: output %d candidates", model, len(result))
```
**Numbers**
`%d` - Integer
`%f` - Float
`%e` - Scientific Notations
`%g` - Switch between `%f` and `%e` automatically
`%b` - Binary
`%o` - Octo
`%x` - Hex

`%d` - For integers, `%3d`: formatted int should have length of at least 3
`%03d`: like `%3d` but pads value with `0` (like `003`).
`%f` - For floats, `%5.2f`: formatted float should keep 2 digits after `.` and have length of at least 5 (including `.`).
`%o` 

`%s` - For strings, `%5.2f`: formatted float should keep 2 digits after `.` and have length of at least 5 (including `.`).
`%r` - Calls an object's `__repr__` method, use it for arbitrary objects.