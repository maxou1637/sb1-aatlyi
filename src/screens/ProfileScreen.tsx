import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native-web';
import { useUserStore } from '../store/userStore';

export function ProfileScreen() {
  const { currentUser, updateUser } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    birthDate: currentUser?.birthDate || '',
    bio: currentUser?.bio || '',
    gender: currentUser?.gender || 'autre',
    orientation: currentUser?.orientation || 'autre',
    photos: currentUser?.photos || []
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && formData.photos.length < 5) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result as string].slice(0, 5)
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (currentUser) {
      updateUser({
        ...currentUser,
        ...formData
      });
    }
    setEditMode(false);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text>Mon Profil</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditMode(!editMode)}
        >
          <View>
            <Text style={styles.editButtonText}>
              {editMode ? 'Annuler' : 'Modifier'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.photoSection}>
        <View style={styles.sectionTitleContainer}>
          <Text>Photos (max 5)</Text>
        </View>
        <View style={styles.photoGrid}>
          {formData.photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              {editMode && (
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => removePhoto(index)}
                >
                  <View>
                    <Text style={styles.removePhotoText}>×</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {editMode && formData.photos.length < 5 && (
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={() => document.getElementById('photo-upload')?.click()}
            >
              <View>
                <Text style={styles.addPhotoText}>+</Text>
              </View>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.sectionTitleContainer}>
          <Text>Informations personnelles</Text>
        </View>
        
        {[
          { label: 'Prénom', field: 'firstName', placeholder: 'Votre prénom' },
          { label: 'Nom', field: 'lastName', placeholder: 'Votre nom' },
          { label: 'Date de naissance', field: 'birthDate', placeholder: 'YYYY-MM-DD' }
        ].map(({ label, field, placeholder }) => (
          <View key={field} style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text>{label}</Text>
            </View>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={formData[field]}
              onChangeText={(value) => handleInputChange(field, value)}
              editable={editMode}
              placeholder={placeholder}
            />
            {field === 'birthDate' && formData.birthDate && (
              <View style={styles.ageTextContainer}>
                <Text>{calculateAge(formData.birthDate)} ans</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Text>Bio</Text>
          </View>
          <TextInput
            style={[styles.input, styles.bioInput, !editMode && styles.disabledInput]}
            value={formData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            multiline
            numberOfLines={4}
            editable={editMode}
            placeholder="Parlez-nous de vous..."
          />
        </View>

        {editMode && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <View>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  photoSection: {
    padding: 20,
  },
  sectionTitleContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 32,
    color: '#666',
  },
  infoSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ageTextContainer: {
    marginTop: 4,
    color: '#666',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#44dd44',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});