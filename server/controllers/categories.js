const Categories = require("../models/Categories");
const Users = require("../models/Users");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(500).json({
        success: false,
        message: "Enter all the details",
      });
    }

    const payload = req.payload;
    const adminDetail = await Users.findById(payload.id);

    const createdCategory = await Categories.create({
      name,
      description,
    });
    // console.log(createdCategory);
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: createdCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find(
      {},
      { name: true, description: true }
    )
      .populate("course")
      .exec();

    return res.status(200).json({
      success: true,
      data: allCategories,
      message: "All available categories retrieved",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Categories.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          {
            path: "ratingAndReviews",
          },
          {
            path: "instructor",
            select: "firstname lastname", 
          },
        ],
      })
      .exec();

    // console.log("SELECTED COURSE", selectedCategory);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    const diffCategory = await Categories.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Categories.findOne(
      diffCategory[getRandomInt(diffCategory.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          {
            path: "ratingAndReviews",
          },
          {
            path: "instructor",
            select: "firstname lastname", 
          },
        ],
      })
      .exec();

      //top selling course code tob added
          const allCategories = await Categories.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          {
            path: "ratingAndReviews",
          },
          {
            path: "instructor",
            select: "firstname lastname", 
          },
        ],
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
      
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
    mostSellingCourses

      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
