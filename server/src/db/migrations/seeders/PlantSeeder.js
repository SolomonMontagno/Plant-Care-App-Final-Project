import { Plant } from "../../../models/index.js"
import plantRecipeRouter from "../../../routes/api/v1/plantRecipeRouter.js"

class PlantSeeder {
    static async seed(){
        const plantsData = [
            {
                name: "Cherokee Purple",
                family: "Tomato",
                type: "Vegetable",
                heirloom: true,
                annual: true,
                season: "Summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw9d5838e2/images/products/vegetables/0753g_01_cherokee_purple.jpg?sw=400&cx=298&cy=58&cw=1052&ch=1052"
            },
            {
                name: "Hungarian Hot Wax",
                family: "Pepper",
                type: "Vegetable",
                heirloom: true,
                annual: true,
                season: "Summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw8fcb332b/images/products/vegetables/03092g_01_hungarianhotwax.jpg?sw=400&sh=400"
            },
            {
                name: "Deep Purple",
                family: "Onion",
                type: "Vegetable",
                heirloom: true,
                annual: true,
                season: "Spring",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw3e65e275/images/products/vegetables/00491_01_deep_purple.jpg?sw=400&cx=368&cy=136&cw=1060&ch=1060"
            },
            {
                name: "Green Magic",
                family: "Broccoli",
                type: "Vegetable",
                heirloom: false,
                season: "Summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw92c0d672/images/products/vegetables/02813_01_greenmagic.jpg?sw=400&cx=124&cy=0&cw=1196&ch=1196"
            },
            {
                name: "Red Ace",
                family: "Beets",
                type: "Vegetable",
                heirloom: false,
                season: "summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw8fb6da4c/images/products/vegetables/0125_01_redace.jpg?sw=400&sh=400"
            },
            {
                name: "Purple Haze",
                family: "Carrots",
                type: "Vegetable",
                heirloom: true,
                season: "spring",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw0798336d/images/products/vegetables/02680_01_purple_haze.jpg?sw=400&cx=432&cy=0&cw=1196&ch=1196"
            },
            {
                name: "Primero",
                family: "Cabbage",
                type: "Vegetable",
                heirloom: false,
                season: "spring",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw7f379658/images/products/vegetables/04625g_01_primero.jpg?sw=400&sh=400"
            },
            {
                name: "German Extra Hardy",
                family: "Garlic",
                type: "Vegetable",
                heirloom: true,
                season: "fall",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw6fb623a3/images/products/vegetables/03535g_02_german_extra_hardy.jpg?sw=400&sh=400"
            },
            {
                name: "Chaperon",
                family: "Cucumber",
                type: "Vegetable",
                heirloom: true,
                season: "summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw9970ccce/images/products/vegetables/04670_01_chaperon.jpg?sw=400&sh=400"
            },
            {
                name: "Black Magic",
                family: "Kale",
                type: "Vegetable",
                heirloom: true,
                season: "summer, fall, spring",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dwf205488d/images/products/vegetables/03531_02_black_magic.jpg?sw=400&sh=400"
            },
            {
                name: "Rosa Bianca",
                family: "Eggplant",
                type: "Vegetable",
                heirloom: true,
                season: "summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw97ead93a/images/products/vegetables/2605g_01_rosabianca.jpg?sw=400&cx=512&cy=138&cw=1000&ch=1000"
            },
            {
                name: "Natural Sweet",
                family: "Corn",
                type: "Vegetable",
                heirloom: false,
                season: "summer",
                plantImageUrl: "https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw86ccaebd/images/products/vegetables/03590g_01_natural_sweet.jpg?sw=400&sh=400"
            }
        ]
        for (const singlePlant of plantsData) {
            const currentPlant = await Plant.query().findOne({ name: singlePlant.name })
            if(!currentPlant) {
                await Plant.query().insert(singlePlant)
            }
        }
    }
}


export default PlantSeeder