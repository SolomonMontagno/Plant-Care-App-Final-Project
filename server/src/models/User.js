/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username", "firstName", "lastName"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" }, 
        cryptedPassword: { type: "string" },
        username: { type: "string", minLength: 5, maxLength: 25 },
        firstName: { type: "string", minLength: 1, maxLength: 30},
        lastName: { type: "string", minLength: 1, maxLength: 40},
        admin: { type: ["boolean", "string"]},
        imageUrl: { type: "string" }

      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
  static get relationMappings(){
    const {Recipe, Plant} = require("./index.js")
    return {
      recipes: {
        relation: Model.HasManyRelation,
        modelClass: Recipe,
        join: {
          from: "users.id",
          to: "recipes.userId"
        }
      },
      plants: {
        relation: Model.ManyToManyRelation,
        modelClass: Plant,
        join: {
          from: "users.id",
          through: {
            from: "recipes.userId",
            to: "recipes.plantId"
          },
          to: "plants.id"
        }
      }
    }
  }
}

module.exports = User;
