import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Api from '../../services/api';

const PostCreate = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // fungsi memilih gambar dari galeri
    const handleSelectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                Alert.alert('Error', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0]);
            }
        });
    };

    // fungsi submit form create post
    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('Peringatan', 'Silakan pilih gambar terlebih dahulu!');
            return;
        }

        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', {
            uri: image.uri,
            name: image.fileName || 'upload.jpg',
            type: image.type || 'image/jpeg',
        });

        try {
            await Api.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Sukses', 'Post berhasil ditambahkan!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            console.error('Error creating post:', error);
            if (error.response && error.response.status === 422) {
                // simpan pesan error validasi
                const valErrors = {};
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((err) => {
                        valErrors[err.path] = err.msg;
                    });
                }
                setErrors(valErrors);
            } else {
                Alert.alert('Error', 'Gagal menyimpan post ke server');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Upload Image Section */}
                <Text style={styles.label}>Gambar Post</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>+ Pilih Gambar dari Galeri</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Title Input */}
                <Text style={styles.label}>Judul Post</Text>
                <TextInput
                    style={[styles.input, errors.title && styles.inputError]}
                    placeholder="Masukkan judul post..."
                    placeholderTextColor="#94a3b8"
                    value={title}
                    onChangeText={setTitle}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

                {/* Content Input */}
                <Text style={styles.label}>Konten Post</Text>
                <TextInput
                    style={[styles.input, styles.textArea, errors.content && styles.inputError]}
                    placeholder="Tulis konten post..."
                    placeholderTextColor="#94a3b8"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.btnSubmit, loading && styles.btnDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.btnSubmitText}>SIMPAN POST</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostCreate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 8,
        marginTop: 12,
    },
    imagePicker: {
        width: '100%',
        height: 200,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#cbd5e1',
        borderStyle: 'dashed',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#64748b',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1e293b',
    },
    textArea: {
        height: 120,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    },
    btnSubmit: {
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnSubmitText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
