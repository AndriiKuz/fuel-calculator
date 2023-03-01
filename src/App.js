import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function App() {
  const [distance, setDistance] = useState(0);
  const [averageFuelConsumption, setAvegageFuelConsumption] = useState(0);
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(0);
  const [quantityPersons, setQuantityPersons] = useState(1);
  const [pricePerPerson, setPricePerPerson] = useState(0);

  const regexp = new RegExp('[^0-9.]');

  useEffect(() => {
    setResult((averageFuelConsumption / 100) * distance * price);
    setPricePerPerson(result / quantityPersons);
  }, [distance, averageFuelConsumption, price, quantityPersons, result]);

  const onInputHandler = (name, value = 0) => {
    switch (name) {
      case 'distance':
        setDistance(value);
        break;
      case 'average':
        setAvegageFuelConsumption(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'quantityPersons':
        setQuantityPersons(value);
        break;
      default:
    }
  };

  const onClear = () => {
    setDistance(0);
    setAvegageFuelConsumption(0);
    setPrice(0);
    setQuantityPersons(1);
  };

  return (
    <Paper
      sx={{ p: 3, m: 2, maxWidth: '650px', background: '#ffffffcc' }}
      elevation={5}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          color: '#103d65',
          fontWeight: 500,
          letterSpacing: '0.6',
        }}
      >
        Розрахунок вартості поїздки
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignContent="flex-end">
              <TextField
                id="distance"
                label="Відстань"
                variant="outlined"
                size="small"
                placeholder="0"
                value={distance}
                sx={{ minWidth: '150px', mr: 1 }}
                onInput={(e) =>
                  onInputHandler('distance', e.target.value.replace(regexp, ''))
                }
              />
              <Typography
                sx={{ fontWeight: 400, mt: 'auto', fontSize: '18px' }}
                component="span"
              >
                км.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <TextField
                id="average"
                label="Ср. витрата палива"
                variant="outlined"
                size="small"
                placeholder="0"
                value={averageFuelConsumption}
                sx={{ minWidth: '150px', mr: 1 }}
                onInput={(e) =>
                  onInputHandler('average', e.target.value.replace(regexp, ''))
                }
              />
              <Typography
                sx={{ fontWeight: 400, mt: 'auto', fontSize: '18px' }}
                component="span"
              >
                л/100км.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <TextField
                id="price"
                label="Вартість палива"
                variant="outlined"
                size="small"
                placeholder="0"
                value={price}
                sx={{ minWidth: '150px', mr: 1 }}
                onInput={(e) =>
                  onInputHandler('price', e.target.value.replace(regexp, ''))
                }
              />
              <Typography
                sx={{ fontWeight: 400, mt: 'auto', fontSize: '18px' }}
                component="span"
              >
                грн.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex">
              <TextField
                id="price"
                label="Кількість пасажирів"
                variant="outlined"
                size="small"
                placeholder="0"
                value={quantityPersons}
                sx={{ minWidth: '150px', mr: 1 }}
                onInput={(e) =>
                  onInputHandler(
                    'quantityPersons',
                    e.target.value.replace(regexp, '')
                  )
                }
              />
              <Typography
                sx={{ fontWeight: 400, mt: 'auto', fontSize: '18px' }}
                component="span"
              >
                пас.
              </Typography>
            </Box>
          </Grid>

          {result ? (
            <Grid item xs={12} sm={6}>
              <Box display="flex">
                <Typography
                  sx={{
                    fontWeight: 500,
                    mt: 'auto',
                    fontSize: '18px',
                    color: '#691a22',
                  }}
                  component="span"
                >
                  Вартість поїздки: {result.toFixed(2)} грн.
                  <br />
                  {quantityPersons > 1
                    ? `Вартість для пасажира: ${pricePerPerson.toFixed(2)} грн.`
                    : null}
                </Typography>
              </Box>
            </Grid>
          ) : null}

          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              className="button"
              sx={{
                mt: 2,
                width: '100%',
              }}
              onClick={onClear}
            >
              Очистити
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default App;
