from sys import path
from pathlib import Path

# Add our containing repo's lib directory to the Python module search path so
# that we can load swipe-swap.api.
libpath = Path(__file__).parent / "lib"
assert libpath.is_dir()

path.insert(0, str(libpath))

from swipe_swap.api import create_app
application = create_app()
