import React ,{useState} from 'react'
import {Button,Paper} from '@material-ui/core';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Renderpath from './Renderpath';
import {API} from '../api/index';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));


const initialState = { start: '', end: '', cheap: ''};


export default function SelectForm(props) {

  const {places} = props;

  const [form, setForm] = useState(initialState);
  const [data, setData] = useState('');

  const getResult=async ()=>{
    const {data} = await API.get('/find-route',{params:form});
    setData(data);
  }

  const classes = useStyles();

  var placename=[]

  for(let i=0;i<places.length;i++){
    placename.push({id:places[i].id,name:places[i].name});
  }

  var Route=[];

  if(data){

    if(data.type==="Cheapest"){

      let i=0;
      let j=0;

      while(i!==data.path.length-1){


        let obj={};
        let objst=placename.find(o=>o.id===data.path[i])
        obj.start=objst.name;
        
        obj.price=data.path[i+1];
        obj.duration=data.path[i+2];
        obj.transport=data.path[i+3];

        let objen=placename.find(o=>o.id===data.path[i+4])
        obj.end=objen.name;
        obj.id=j;
        j++;

        Route.push(obj);
        i+=4;
      }
      
    }
    else{

      let i=0;
      let j=0;
      
      while(i!==data.path.length-1){
        let obj={};

        let objst=placename.find(o=>o.id===data.path[i])
        obj.start=objst.name;

        obj.duration=data.path[i+1];
        obj.price=data.path[i+2];
        obj.transport=data.path[i+3];

        let objen=placename.find(o=>o.id===data.path[i+4])
        obj.end=objen.name;
        obj.id=j;
        j++;
        Route.push(obj);
        i+=4;
      }

    }
  }


  const handleSubmit=(e)=>{
    e.preventDefault();

    if(form.start==='')alert('please select a source')
    else if(form.end==='')alert('please select a destination')
    else if(form.start===form.end)alert("Source and Destination cannot be same")
    else if(form.cheap==='')alert("please select an option for fastest or cheapest route")
    else getResult(form);

  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  var pathArray=[];

  for(let i=0;i<Route.length;i++){
    pathArray.push(Route[i]);
  }

  let hh=parseInt(data.total/60);
  let mm=data.total-60*hh;

  return (
    
    <div>
    <Paper className={classes.paper}>
    <form classes onSubmit={handleSubmit}>
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Source</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          name="start"
          onChange={handleChange}
          input={<Input />}
        >
          {placename.map((place) => (
            <MenuItem key={place.id} value={place.name} >
              {place.name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Destination</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          name="end"
          onChange={handleChange}
          input={<Input />}
        >
          {placename.map((place) => (
            <MenuItem key={place.id} value={place.name} >
              {place.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <RadioGroup aria-label="gender" name="cheap"  onChange={handleChange}>
        <FormControlLabel value="False" control={<Radio />} label="Fastest" />
        <FormControlLabel value="True" control={<Radio />} label="Cheapest" />
      </RadioGroup>

      <Button  variant="contained" color="primary" size="large" type="submit">Submit</Button>

     </form>

     </Paper>


        <div class="container">
          {
            (!data)?"":(data.type==="Cheapest")?

            <h2 className="mt-2">Total amount with Discount: {data.total} EUR </h2> 
            :
            <h2 className="mt-2">Total time : {hh} hrs {(mm==0)?"":<span>{mm} mins</span>} </h2>

          }
        </div>

        {(!data)?"":
          <Renderpath list={pathArray}/>
        }

      </div>

  );
}
