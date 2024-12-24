import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchVal: '',
  selectedClass: '',
  cohortfilter: '',
  classfilter: '',
  users: [],
  filteredUsers: [],
  isDialogOpen: false,
  user: {
    name: '',
    cohort: '',
    class: '',
    courses: [],
    date_joined: '',
    last_login: '',
    status: ''
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    setCohortFilter: (state,action) => {
      state.cohortfilter = action.payload;
    },
    setClassFilter: (state,action) => {
      state.classfilter = action.payload;
    },
    setIsDialogOpen: (state,action) => {
      state.isDialogOpen = action.payload;
    }
  },
})

export const { setSearchVal, setUsers, setFilteredUsers, setUser, setSelectedClass, setCohortFilter, setClassFilter,setIsDialogOpen} = userSlice.actions

export default userSlice.reducer