import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth, db } from '../../../../firebase'; // Assuming you have db initialized in firebase.js
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // For updating and fetching user data in Firestore
import SignOutButton from '../../../Components/Buttons/SignOut';

const Profile = () => {
  // Separate states for username, bio, address, and phone
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("This is the bio.");
  const [address, setAddress] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+123 456 7890");

  // Fetch user data on mount
  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsername(userData.username || "Username");
          setBio(userData.bio || "This is the bio.");
          setAddress(userData.address || "Enter Address");
          setPhone(userData.phone || "Enter Phone number");
        } else {
          console.log("No such document!");
        }
      };
      fetchUserData();
    }
  }, []);

  const handleSaveUsername = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { username });
        alert("Username updated successfully!");
        setIsEditingUsername(false);
      } catch (error) {
        alert("Error updating username: " + error.message);
      }
    }
  };

  const handleSaveBio = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { bio });
        alert("Bio updated successfully!");
        setIsEditingBio(false);
      } catch (error) {
        alert("Error updating bio: " + error.message);
      }
    }
  };

  const handleSaveContact = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { address, phone });
        alert("Contact info updated successfully!");
        setIsEditingContact(false);
      } catch (error) {
        alert("Error updating contact info: " + error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/profile-pic.jpg')} // Replace with your actual profile image
          style={styles.profilePic}
        />
        <Text style={styles.userName}>
          {auth.currentUser ? username : 'Loading...'}
        </Text>
        {/* <Text style={styles.subscriptionType}>Free User</Text> */}
      </View>

      {/* Editable Username Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Username</Text>
          <TouchableOpacity onPress={() => setIsEditingUsername(true)}>
            <FontAwesome 
              style={styles.iconStyle} 
              name="pencil-square-o" 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
        {isEditingUsername ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
          />
        ) : (
          <Text style={styles.sectionText}>{username}</Text>
        )}
        {isEditingUsername && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Editable Bio Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <TouchableOpacity onPress={() => setIsEditingBio(true)}>
            <FontAwesome 
              style={styles.iconStyle} 
              name="pencil-square-o" 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
        {isEditingBio ? (
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            placeholder="Write something about yourself..."
            multiline
          />
        ) : (
          <Text style={styles.sectionText}>{bio}</Text>
        )}
        {isEditingBio && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveBio}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Editable Contact Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity onPress={() => setIsEditingContact(true)}>
            <FontAwesome 
              style={styles.iconStyle} 
              name="pencil-square-o" 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
        {isEditingContact ? (
          <>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionText}>Phone: {phone}</Text>
            <Text style={styles.sectionText}>Address: {address}</Text>
          </>
        )}
      </View>

      <SignOutButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 10,
    borderWidth: 0.1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242426',
  },
  subscriptionType: {
    fontSize: 18,
    color: '#C7C7CC',
  },
  sectionContainer: {
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242426',
  },
  sectionText: {
    fontSize: 16,
    color: '#242426',
  },
  bioInput: {
    fontSize: 16,
    color: '#242426',
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  input: {
    fontSize: 16,
    color: '#242426',
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#0c3e27',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  iconStyle: {
    marginLeft: 10,
  },
});

export default Profile;
