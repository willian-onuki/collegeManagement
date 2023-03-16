import { Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PAGES } from '../../constants';
import { FiPower } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
export function SideBar() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      width: 'auto',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    closed: {
      width: '60px',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      initial={false}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
    >
      <Flex
        w='100%'
        h='100vh'
        direction='column'
        px={10}
        py={6}
        bg={theme.colors.primary_dark}
      >
        <Box mt={12}>
          <Stack
            spacing={6}
            align='flex-start'
          >
            {PAGES.map(
              (page) =>
                page.icon && (
                  <Button
                    bg='red'
                    height='40px'
                    display='flex'
                    alignItems='center'
                    border='none'
                    // onClick={() => push(page.path)}
                    background={theme.colors.primary_light}
                    w='100%'
                    p={4}
                    key={page.path}
                    borderRadius={6}
                  >
                    <Icon
                      as={page.icon}
                      size='20px'
                      fontSize={24}
                      ml={5}
                      color={theme.colors.shape}
                      // color={page.path === currentPath ? 'white' : 'cta'}
                    />
                    <Box
                      overflow='hidden'
                      width='100%'
                    >
                      <Link to={page.path} style={{textDecoration: 'none'}}>
                        <Text
                          whiteSpace='nowrap'
                          ml={4}
                          fontWeight='medium'
                          color={theme.colors.shape}
                        >
                          {page.name}
                        </Text>
                      </Link>
                    </Box>
                  </Button>
                )
            )}
          </Stack>
        </Box>

        <Button
          display='flex'
          alignItems='center'
          onClick={() => {}}
          w='100%'
          p={4}
          borderRadius={6}
          mt='auto'
          bg='transparent'
          border='none'
        >
          <Icon
            as={FiPower}
            size='20px'
            fontSize={24}
            color={theme.colors.secondary_red}
            ml={5}
          />
          <Box
            overflow='hidden'
            width='100%'
          >
            <Text
              whiteSpace='nowrap'
              ml={4}
              fontWeight='medium'
              color={theme.colors.secondary_red}
            >
              Sair
            </Text>
          </Box>
        </Button>
      </Flex>
    </motion.div>
  );
}
