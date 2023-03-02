import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  onClear,
  onInputHandler,
  totalPrice,
  pricePerPassenger,
} from './slices/AppSlice';

function App() {
  const dispatch = useDispatch();
  const {
    result,
    distance,
    averageFuelConsumption,
    price,
    quantityPersons,
    pricePerPerson,
  } = useSelector((state) => state.app);

  const regexp = new RegExp('[^0-9.]');

  useEffect(() => {
    dispatch(totalPrice());
    dispatch(pricePerPassenger());
  }, [distance, averageFuelConsumption, price, quantityPersons, dispatch]);

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
                  dispatch(
                    onInputHandler({
                      name: 'distance',
                      value: e.target.value.replace(regexp, ''),
                    })
                  )
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
                  dispatch(
                    onInputHandler({
                      name: 'average',
                      value: e.target.value.replace(regexp, ''),
                    })
                  )
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
                  dispatch(
                    onInputHandler({
                      name: 'price',
                      value: e.target.value.replace(regexp, ''),
                    })
                  )
                }
              />
              <Typography
                sx={{ fontWeight: 400, mt: 'auto', fontSize: '18px' }}
                component="span"
              >
                грн/л.
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
                placeholder="1"
                value={quantityPersons}
                sx={{ minWidth: '150px', mr: 1 }}
                onInput={(e) =>
                  dispatch(
                    onInputHandler({
                      name: 'quantityPersons',
                      value: e.target.value.replace(regexp, ''),
                    })
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
              onClick={() => dispatch(onClear())}
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
