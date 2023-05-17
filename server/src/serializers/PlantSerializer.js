
class PlantSerializer {
    static getSummary(plant) {
        const allowedAttributes = ["id", "name", "family", "type", "heirloom", "annual", "season", "plantImageUrl"]

        const serializedPlant = {};
        for (const attribute of allowedAttributes) {
            serializedPlant[attribute] = plant[attribute]
        }

        return serializedPlant
    }
}

export default PlantSerializer