import { ADD_GROUP } from '../actionTypes';
import { fetchMethod } from '../thunkUtils';

export const addGroupAC = (group) => ({ type: ADD_GROUP, payload: {group} });


export const addGroupThunk = (group) => async (dispatch) => {
  try {
    const response = await fetchMethod({
      path: 'http://localhost:3100/group/add',
      method: 'post',
      body: group
    });
    
    dispatch(addGroupAC(group));
   
  } catch (err) {
    console.log('Err', err);
  }
};
