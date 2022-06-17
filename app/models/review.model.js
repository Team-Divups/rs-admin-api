module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    site_id: {
      type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    },
    sentiment: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.STRING
    }
  });

  return Review;
};

// CREATE TABLE `reviews` (
//   `idreviews` int NOT NULL,
//   `site_id` int NOT NULL,
//   `content` varchar(100) DEFAULT NULL,
//   `sentiment` varchar(45) DEFAULT NULL,
//   `rating` int DEFAULT NULL,
//   `date` datetime DEFAULT CURRENT_TIMESTAMP,
//   `id_Reviewer` int DEFAULT NULL,
//   PRIMARY KEY (`idreviews`),
//   KEY `idSite_idx` (`site_id`),
//   KEY `id_Reviewer_idx` (`id_Reviewer`),
//   CONSTRAINT `id_Reviewer` FOREIGN KEY (`id_Reviewer`) REFERENCES `reviewer` (`idReviewer`),
//   CONSTRAINT `site_id` FOREIGN KEY (`site_id`) REFERENCES `site` (`idsite`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;