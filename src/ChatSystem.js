import React, { useState, useEffect } from 'react';
import { Box, VStack, Input, Button, Text, useToast } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
}

// Initialize Supabase client only if credentials are available
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return;
    }

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on('INSERT', payload => {
        setMessages(current => [...current, payload.new]);
      })
      .subscribe();

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load messages',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!supabase) {
      toast({
        title: 'Error',
        description: 'Chat system not properly configured',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{ content: newMessage }]);

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box flex="1" overflowY="auto" maxH="400px">
          {messages.map((message, index) => (
            <Box key={index} p={2} bg="gray.100" borderRadius="md" mb={2}>
              <Text>{message.content}</Text>
            </Box>
          ))}
        </Box>
        
        <form onSubmit={handleSendMessage}>
          <VStack spacing={2}>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="submit" colorScheme="teal" isFullWidth>
              Send
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default ChatSystem;

