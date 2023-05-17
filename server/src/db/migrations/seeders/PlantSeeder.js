import { Plant } from "../../../models/index.js"

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