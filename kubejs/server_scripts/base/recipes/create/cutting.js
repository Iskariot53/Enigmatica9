ServerEvents.recipes((event) => {
    const id_prefix = 'enigmatica:base/create/cutting/';

    const recipes = [
        /*
        {
            input: ['minecraft:acacia_wood'],
            outputs: ['minecraft:stripped_acacia_wood'],
            processingTime: 50,
            id: `${id_prefix}stripped_oak_log_from_oak_log`
        }
        */
    ];

    wood_properties.forEach((material) => {
        let input = material.log.block,
            output = material.log.stripped;

        // Log to Stripped
        recipes.push({
            input: [Item.of(input)],
            outputs: [Item.of(output)],
            processingTime: 50,
            id: `${id_prefix}${output.replace(':', '_')}_from_${input.replace(':', '_')}`
        });

        input = material.wood.block;
        output = material.wood.stripped;

        // Wood to Stripped
        recipes.push({
            input: [Item.of(input)],
            outputs: [Item.of(output)],
            processingTime: 50,
            id: `${id_prefix}${output.replace(':', '_')}_from_${input.replace(':', '_')}`
        });

        input = material.log.stripped;
        output = material.plank.block;

        // Stripped to Plank
        recipes.push({
            input: [Item.of(input), Item.of(material.wood.stripped)],
            outputs: [Item.of(output, 6)],
            processingTime: 50,
            id: `${id_prefix}${output.replace(':', '_')}_from_${input.replace(':', '_')}`
        });
    });

    recipes.forEach((recipe) => {
        recipe.type = 'create:cutting';

        // ingredients:  [{ item: 'minecraft:oak_log' }],
        recipe.ingredients = recipe.input.map((input) => input.toJson());

        // results: [{ count: 6, item: 'minecraft:oak_planks' }]
        recipe.results = recipe.outputs.map((output) => output.toJson());

        event.custom(recipe).id(recipe.id);
    });
});
