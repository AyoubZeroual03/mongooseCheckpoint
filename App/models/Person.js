const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);



const createAndSavePerson = (onePerson, done) => {
  const OnePerson = new Person(onePerson);

  OnePerson.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });

};



const CreateManyRecords = (ManyPerson, done) => {
  Person.create(ManyPerson, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};




const findPersons = (name, done) => {
  Person.find({ "name": name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
}
const findOneByFood = (food, done) => {
  Person.find({ favoriteFoods: food }, (err, data) => {

    if (err) return done(err)
    done(null, data)
  });
};
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
};


var findAndUpdate = function (personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    { "name": personName },
    { $set: { "age": ageToSet } }, { returnNewDocument: true },
    function (err, data) {
      if (err) {
        console.log("Something wrong when updating record!");
      }
      console.log(data);
    })
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
};

const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    err ? done(err) : done(null, data)
  }
  )
};





const chainSearchQuery = function (foodToSearch, done) {

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: "desc" }).limit(2).select("-age").exec((err, data) => {
    if (err)
      done(err);
    done(null, data);
  })
};
exports.modules = {
  createAndSavePerson, CreateManyRecords, findPersons,
  findOneByFood, findPersonById, removeById, removeManyPeople, chainSearchQuery
}