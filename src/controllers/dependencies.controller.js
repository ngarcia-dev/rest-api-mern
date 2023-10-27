import Dependency from "../models/dependency.model.js";

export const getDependencies = async (req, res) => {
  try {
    const dependencies = await Dependency.find({}).populate("staff");
    res.json(dependencies);
  } catch (error) {
    return res.status(500).json({ messege: "Something went wrog" });
  }
};

export const createDependency = async (req, res) => {
  try {
    const { name, email, date, staff } = req.body;
    const newDependency = new Dependency({
      name,
      email,
      date,
      staff,
    });
    const savedDependency = await newDependency.save();
    res.json(savedDependency);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrog" });
  }
};

export const getDependency = async (req, res) => {
  try {
    const dependency = await Dependency.findById(req.params.id).populate(
      "staff"
    );
    if (!dependency)
      return res.status(404).json({ message: "Dependency not found" });
    res.json(dependency);
  } catch (error) {
    return res.status(404).json({ message: "Dependency not found" });
  }
};

export const deleteDependency = async (req, res) => {
  try {
    //TODO: add authorized administrator user only remove dependencies
    const dependecy = await Dependency.findByIdAndDelete(req.params.id);
    if (!dependecy)
      return res.status(404).json({ message: "Dependency not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ messege: "Dependency not found" });
  }
};

export const updateDependency = async (req, res) => {
  try {
    const dependency = await Dependency.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!dependency)
      return res.status(404).json({ messege: "Dependency not found" });
    res.json(dependency);
  } catch (error) {
    return res.status(404).json({ messege: "Dependency not found" });
  }
};
