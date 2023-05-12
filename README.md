# Qwik Dynamic Component and MFE prototype

## @remotes

Imports to @remotes will grab a remote file (currently in the same repo). We can codegen types into the src/@remotes folder for imports to work then use vite to connect the imports to the hosted repo. (This is kind of like webpack module federation).

Note:
right now we are using the same server due to limits of qwik. `importmap.json` should be able to point to any domain but Qwik and the Optimizer doesn't correctly read the import maps.
