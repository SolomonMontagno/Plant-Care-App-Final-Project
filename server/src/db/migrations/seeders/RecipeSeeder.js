import { Recipe, Plant, User } from "../../../models/index.js"

class RecipeSeeder {
    static async seed(){

        const tomatoForceOne = await Plant.query().findById(1)
        const peppaPig = await Plant.query().findById(2)
        const bigDaddyScally = await Plant.query().findById(3) 

        const recipeData= [
            {
                recipeImageUrl: "https://plant-care-app-final-project.s3.amazonaws.com/Tomatoforfinal.jpg",
                name: "Cherokee Purple Care Guide",
                pestManagement: "Make sure to watch for tomato horned-worm. You can find them by watching out for their droppings.",
                wateringSchedule: "Once per day",
                wateringAmount: "1 gallon",
                lightAmount: "16 hours of direct light",
                harvestNotes: "Grab tomato by the base with one hand. Using the other hold the stem of the tomato and pull away with the first hand.",
                plantLocation: "Outside garden",
                plantId: tomatoForceOne.id,
                userId: 1
            },

            {
                name: "Hungarian Hot-Wax Care Guide",
                pestManagement: "Make sure to look for thrips. They will suck the plant dry",
                wateringSchedule: "Once per day",
                wateringAmount: "1 gallon",
                lightAmount: "16 hours of direct light",
                harvestNotes: "Use clippers to cut fruit from stem.",
                plantLocation: "Outside garden",
                plantId: peppaPig.id,
                userId: 1
            },

            {
                name: "Deep Purple Scallions Care Guide",
                pestManagement: "Watch out onion thrips. They will leave little white pock marks on the leaves.",
                wateringSchedule: "Once per day",
                wateringAmount: "half of gallon",
                lightAmount: "12 hours of direct light",
                harvestNotes: "Loosen the soil around the scallion first. Then pull up from the base.",
                plantLocation: "Outside garden",
                plantId: bigDaddyScally.id,
                userId: 1
            },
        ]
        for (const singleRecipe of recipeData){
            const currentRecipe = await Recipe.query().findOne({ name: singleRecipe.name})
            if(!currentRecipe){
                await Recipe.query().insert(singleRecipe)
            }
        }
    }
}

export default RecipeSeeder