var textures = {}

function add_texture(name, filename) {
    textures[name] = PIXI.Texture.from(`./src/assets/sprites/${filename}`);
}

function add_textures(name, filename, count)
{
    for (let i = 1; i < count + 1; i++)
        add_texture(name + i, filename + i + '.png')
}

add_texture('settings', 'settings.png');
add_textures('life', 'life', 4);