import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { Layout } from '../components/layouts';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  theme: string;
}

const ThemeChangerPage: NextPage<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);

    Cookies.set('theme', event.target.value);
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onChange}>
              <FormControlLabel
                value={'light'}
                control={<Radio />}
                label='Light'
              />

              <FormControlLabel
                value={'dark'}
                control={<Radio />}
                label='Dark'
              />

              <FormControlLabel
                value={'custom'}
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const { theme = 'light' } = req.cookies as { theme: string };

  const validTheme = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validTheme.includes(theme) ? theme : 'light',
    },
  };
};

export default ThemeChangerPage;
