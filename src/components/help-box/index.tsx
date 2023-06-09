import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Restaurant Owner'];
  const roles = ['Restaurant Owner', 'Restaurant Owner', 'Waiter', 'Customer'];
  const applicationName = 'TableReserve v12';
  const tenantName = 'Restaurant';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `User Stories for Restaurant Owner:
1. As a restaurant owner, I want to create an account for my organization so that I can manage my restaurants on the platform.
2. As a restaurant owner, I want to add and manage multiple restaurants under my organization so that I can streamline table bookings for all my restaurants.
3. As a restaurant owner, I want to set up and manage table layouts for each restaurant so that I can optimize restaurant occupancy.
4. As a restaurant owner, I want to invite and manage waiters for each restaurant so that they can assist with table reservations and customer preferences.
5. As a restaurant owner, I want to view and manage all table reservations for my restaurants so that I can ensure efficient table management.

User Stories for Waiter:
1. As a waiter, I want to accept the invitation from the restaurant owner so that I can join the organization and assist with table reservations.
2. As a waiter, I want to view and manage table reservations for the restaurant I am assigned to so that I can ensure efficient table management.
3. As a waiter, I want to add and manage customer preferences for each reservation so that we can provide a personalized experience for our customers.

User Stories for Customer:
1. As a customer, I want to search for a restaurant on the platform so that I can make a table reservation.
2. As a customer, I want to create an account so that I can manage my table reservations and preferences.
3. As a customer, I want to make a table reservation at a restaurant so that I can secure a table for my desired date and time.
4. As a customer, I want to manage my table reservations so that I can modify or cancel them if needed.
5. As a customer, I want to add and manage my preferences for each reservation so that the restaurant can provide a personalized experience.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
