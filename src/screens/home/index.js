import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import Api from '../../services/api';

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // fungsi mengambil data posts dari API
    const fetchPosts = async () => {
        try {
            const response = await Api.get('/api/posts');
            setPosts(response.data.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            Alert.alert('Error', 'Gagal memuat data posts dari server');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // fetch data saat halaman pertama kali dibuka atau kembali difokuskan
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPosts();
        });
        return unsubscribe;
    }, [navigation]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts();
    }, []);

    // fungsi menghapus post
    const handleDeletePost = (id) => {
        Alert.alert(
            'Konfirmasi Hapus',
            'Apakah Anda yakin ingin menghapus data post ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await Api.delete(`/api/posts/${id}`);
                            Alert.alert('Sukses', 'Post berhasil dihapus!');
                            fetchPosts();
                        } catch (error) {
                            console.error('Error deleting post:', error);
                            Alert.alert('Error', 'Gagal menghapus post');
                        }
                    },
                },
            ]
        );
    };

    // render item setiap post
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: `http://10.0.2.2:3000/uploads/${item.image}` }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.cardBody}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnEdit]}
                        onPress={() => navigation.navigate('PostEdit', { id: item.id })}
                    >
                        <Text style={styles.btnText}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnDelete]}
                        onPress={() => handleDeletePost(item.id)}
                    >
                        <Text style={styles.btnText}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => navigation.navigate('PostCreate')}
                >
                    <Text style={styles.btnAddText}>+ TAMBAH POST</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text style={styles.loadingText}>Memuat data...</Text>
                </View>
            ) : posts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Belum ada data post.</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3b82f6']} />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    btnAdd: {
        backgroundColor: '#10b981',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnAddText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#cbd5e1',
    },
    cardBody: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    btnEdit: {
        backgroundColor: '#3b82f6',
    },
    btnDelete: {
        backgroundColor: '#ef4444',
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#64748b',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#94a3b8',
    },
});
