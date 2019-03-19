[HTML App Here](https://quadriplanar.github.io/examples/terrain/expansion/Expansion%20Terrain.html)
\\
A new and improved version of the terrain generation program from yesterday, this one works by the following method:
  1. Create the map array and initiallize as all water tiles
  1. Seed a **number** of land tiles randomly about
  1. Then expands these land masses by looking at each tile and turning it to land if:
        1. the number of adjacent land tiles are above a certain **threshold**
        1. or a **RNG chance** to turn to land
  1. Step 3) is repeated a number of **times**
\\
All the bold values above are range sliders that can be set to try different values on this generator, as well as setting the size of each tiles to make more detailed maps.
(note that very small values for resolution may take some time to load depending on your browser and computer)
\
See the code in the repository [Here](https://github.com/quadriplanar/quadriplanar.github.io/tree/master/examples/terrain/expansion)
