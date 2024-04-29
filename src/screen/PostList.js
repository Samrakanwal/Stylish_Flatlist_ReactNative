import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/postreducer';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  const loading = status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Post selected:', item.id)} style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={3} style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerFooter}>
      <Text style={styles.headerFooterText}>User Posts</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.headerFooter}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No posts available.</Text>
    </View>
  );

  if (status === 'failed') {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshing={loading}
      onRefresh={() => dispatch(fetchPosts())}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#274472',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21B6A8',
  },
  body: {
    fontSize: 14,
    color: '#2E8BC0',
    marginTop: 8,
  },
  error: {
    color: 'red',
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
  },
  headerFooter: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerFooterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginTop:50,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default PostsList;
