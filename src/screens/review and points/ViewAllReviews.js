import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // For stars

const dummyReviews = [
  {
    review_id: '1',
    user: 'John Doe',
    rating: 4,
    description: "Great product! I'm loving it.",
  },
  {
    review_id: '2',
    user: 'Jane Smith',
    rating: 2,
    description: 'Poor service and quality.',
  },
  // Add more dummy review data here
];

const calculateAverageRating = () => {
  const totalRatings = dummyReviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRatings / dummyReviews.length;
};

const ReviewCard = ({ review }) => (
  <Card style={styles.card}>
    <View style={styles.ratingContainer}>
      <Icon name="star" style={styles.starIcon} />
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <Card.Content>
      <Text style={styles.username}>{review.user}</Text>
      <View style={styles.feedbackContainer}>
        <View style={[styles.feedbackItem, review.rating >= 4 && styles.good]}>
          <Text style={styles.feedbackText}>Good</Text>
        </View>
        <View style={[styles.feedbackItem, review.rating > 2 && review.rating < 4 && styles.average]}>
          <Text style={styles.feedbackText}>Average</Text>
        </View>
        <View style={[styles.feedbackItem, review.rating <= 2 && styles.bad]}>
          <Text style={styles.feedbackText}>Bad</Text>
        </View>
      </View>
      <Text style={styles.description}>{review.description}</Text>
    </Card.Content>
  </Card>
);

const ReviewPage = () => {
  const averageRating = calculateAverageRating();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>All ratings: {dummyReviews.length}</Text>
        <View style={styles.averageRatingContainer}>
          <Icon name="star" style={styles.starIcon} />
          <Text style={styles.averageRatingText}>{averageRating.toFixed(1)}</Text>
        </View>
      </View>
      <FlatList
        data={dummyReviews}
        keyExtractor={(item) => item.review_id}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    color: 'gold',
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: 'black',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  feedbackItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  good: {
    backgroundColor: 'lightblue',
  },
  bad: {
    backgroundColor: 'lightblue',
  },
  average: {
    backgroundColor: 'lightblue',
  },
  feedbackText: {
    color: 'black',
  },
  description: {
    fontSize: 14,
  },
  averageRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageRatingText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ReviewPage;
