ServerEvents.recipes((event) => {
    const id_prefix = 'enigmatica:base/immersiveengineering/cloche/';

    const recipes = [];

    // Cloche additions from crop_properties constant
    let crop_types = Object.keys(crop_properties);

    crop_types.forEach((type) => {
        let processing = crop_properties[type].crop_processing,
            growth_ticks = 800 * processing.growth_modifier,
            primary_count = 2,
            secondary_count = 1;

        if (type == 'fiber_crops') {
            primary_count = 1;
            secondary_count = 2;
        }

        if (type == 'vines') {
            return;
        }

        crop_properties[type].crops.forEach((crop) => {
            if (crop.substrate == 'water') {
                return;
            }

            let results = [{ item: crop.plant, count: primary_count }];

            if (type.includes('_crops') && crop.seed !== 'minecraft:chorus_flower') {
                results.push({ item: crop.seed, count: secondary_count });
            }
            recipes.push({
                results: results,
                input: { item: crop.seed },
                render: crop.render,
                soil: { tag: `enigmatica:soils/${crop.substrate}` },
                time: Math.trunc(growth_ticks),
                id: `${id_prefix}${crop.plant.replace(':', '_')}`
            });
        });
    });

    recipes.forEach((recipe) => {
        recipe.type = 'immersiveengineering:cloche';
        event.custom(recipe).id(recipe.id);
    });
});