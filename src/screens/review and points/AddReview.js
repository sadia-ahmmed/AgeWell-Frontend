import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ReviewForm = ({ isVisible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Submitted Rating:', rating);
    console.log('Submitted Comment:', comment);
    setRating(0);
    setComment('');
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.title}>Leave a Review</Text>
          </View>

          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'Ok', 'Good', 'Excellent']}
            defaultRating={0}
            size={24}
            onFinishRating={setRating}
            selectedColor='#439be8'
          />

          <TextInput
            style={styles.commentInput}
            placeholder="Write your review here..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#439be8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewForm;
