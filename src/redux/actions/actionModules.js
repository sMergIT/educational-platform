import { GET_MODULES, ADD_MODULE, UPDATE_MODULE } from '../actionTypes';
import { fetchMethod } from '../thunkUtils';

export const addModuleAC = (moduleInfo) => ({ type: ADD_MODULE, payload: { moduleInfo } });
export const getModulesAC = (modules) => ({ type: GET_MODULES, payload: { modules } });
export const updModuleAC = (module) => ({ type: UPDATE_MODULE, payload: { module } });

export const getModulesThunk = (userId, role) => async (dispatch) => {
  try {
    const response = await fetchMethod({
      path: `http://localhost:3100/module/${role}`,
      method: 'post',
      body: { userId }
    });
    if (!response.error) {
      const modulList = response;
      dispatch(getModulesAC(modulList));
    }

  } catch (err) {
    console.log('Err', err);
  }
}

export const addModulesThunk = (titleSpec, moduleTitle, userId, curatorId) => async (dispatch) => {
  try {
    const response = await fetchMethod({
      path: 'http://localhost:3100/module/add',
      method: 'post',
      body: { titleSpec, moduleTitle, userId, curatorId }
    });

    if (!response.error) {
      const moduleInfo = response;
      dispatch(addModuleAC(moduleInfo));
    }
  } catch (err) {
    console.log('Err', err);
  }
};

export const updateModuleThunk = (module) => async (dispatch) => {
  try {
    const response = await fetchMethod({
      path: 'http://localhost:3100/module/update',
      method: 'post',
      body: { moduleId: module._id, titleModule: module.title }
    });

    if (!response.error) {
      const moduleInfo = response;
      console.log('moduleInfo', moduleInfo);
      dispatch(updModuleAC(moduleInfo));
    }
  } catch (err) {
    console.log('Err', err);
  }
}
