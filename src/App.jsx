import React,{useEffect} from 'react'
import { supabase } from './createClient'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchVal, setUsers, setFilteredUsers, setUser, setSelectedClass, setCohortFilter, setClassFilter,setIsDialogOpen } from './redux/user/userSlice'
import titleimg from './assets/images/title.png'
import dashimg from './assets/images/dashboard.png'
import studentsimg from './assets/images/students.png'
import chapterimg from './assets/images/chapter.png'
import helpimg from './assets/images/help.png'
import reportsimg from './assets/images/report.png'
import settingsimg from './assets/images/settings.png'
import searchimg from './assets/images/search.png'
import msgimg from './assets/images/message.png'
import filterimg from './assets/images/filter.png'
import notimg from './assets/images/notification.png'
import katicoximg from './assets/images/katicox.png'
import addimg from './assets/images/plus.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const App = () => {
  const dispatch = useDispatch();
  const { searchVal, filteredUsers, users, user, selectedClass, cohortfilter, classfilter, isDialogOpen} = useSelector(state => state.user);

  const handleInput = (e) => {
    dispatch(setSearchVal(e.target.value));
  }

  const handleCohortChanges = (event) => {
    dispatch(setCohortFilter(event.target.value));
  };

  const handleClassChanges = (event) => {
    dispatch(setClassFilter(event.target.value));
  };
  
  const handleClassChange = (event) => {
    const newClass = event.target.value;
    dispatch(setSelectedClass(newClass));
    dispatch(setUser({
      ...user,
      class: newClass,
      courses:[],
    }));
  };

  const handleSubjectChange = (event) => {
    const { value, checked} = event.target;
    dispatch(setUser({
      ...user,
      courses: checked
        ? [...user.courses, value]
        : user.courses.filter((course) => course !== value),
    }));
  };

  
  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(user => {
      return (
        (cohortfilter === '' || user.Cohort === cohortfilter) &&
        (classfilter === '' || user.Class === classfilter)
      );
    });
    dispatch(setFilteredUsers(filtered));
  }, [cohortfilter, classfilter, users, dispatch]);
  
  
  useEffect(() => {
    const lowercasedSearchVal = searchVal.toLowerCase();
    const filtered = users.filter(user =>
      user.Name?.toLowerCase().includes(lowercasedSearchVal) ||
      user.Cohort?.toLowerCase().includes(lowercasedSearchVal) ||
      user.Courses?.some(course => course.toLowerCase().includes(lowercasedSearchVal)) ||
      user.Status?.toLowerCase().includes(lowercasedSearchVal)
    );
    dispatch(setFilteredUsers(filtered));
  }, [searchVal, users,dispatch]);
  
  
  async function fetchUsers() {
    const {data} = await supabase.from('users').select('*')
    if(data){
      const sortedData = data.sort((a, b) => a.Name.localeCompare(b.Name));
      dispatch(setUsers(sortedData));
    }
  }
  
  function handleChange(e){
    dispatch(setUser({
      ...user,
      [e.target.name]:e.target.value
    }))
  }
  
  console.log(user)

  async function createUser(e) {
    e.preventDefault();
    if(!user.name || !user.cohort || !user.class || !user.courses || !user.date_joined || !user.last_login || !user.status) {
      alert("Please fill in all the fields.");
      return;
    }
    if(!user.courses || user.courses.length === 0){
      alert("Please select at least one course.");
      return;
    }
    try {
      const { error } = await supabase
        .from('users')
        .insert({
          Name: user.name,
          Cohort: user.cohort,
          Class: user.class,
          Courses: user.courses,
          Date_joined: user.date_joined,
          Last_login: user.last_login,
          Status: user.status,
        });
  
      if (error) throw error;
  
      alert("Student added successfully!");
      dispatch(setIsDialogOpen(false));
      dispatch(setUser({
        name: "",
        cohort: "",
        class: "",
        courses: [],
        date_joined: "",
        last_login: "",
        status: "",
      }));
  
      fetchUsers();
    } catch (error) {
      console.error("Error adding student:", error.message);
      alert("Failed to add student");
    }
  }
  


  return (
    <div>
      <div className='w-full flex h-full flex-col lg:flex-row relative'>
        <div className='leftpart w-full lg:w-1/5 lg:fixed' >
          <div className='sidebar w-full p-3'>
            <div className='title mx-3 my-5 flex flex-col items-center lg:items-start'>
              <img src={titleimg} alt="error" className='w-[100px] hover:cursor-pointer'/>
            </div>
            <div className='font-noto-sans font-bold text-[16px] text-[#6F767E]  gap-y-[2px] w-full flex flex-col items-center'>
              <div className='dashboard group flex w-full justify-center lg:justify-start p-3 items-center hover:bg-slate-300 hover:text-black rounded-[6px] hover:cursor-pointer'>
                <div className=' p-3 '>
                  <img src={dashimg} alt="error" className='group-hover:brightness-0 '/>
                </div>
                <div>Dashboard</div>
              </div>
              <div className='students flex w-full justify-center lg:justify-start p-3 items-center bg-slate-200 text-black rounded-[6px] hover:cursor-pointer hover:bg-slate-300'>
                <div className=' p-3'>
                  <img src={studentsimg} alt="error" />
                </div>
                <div>Students</div>
              </div> 
              <div className='chapter group flex w-full justify-center lg:justify-start p-3 items-center hover:bg-slate-300 hover:text-black rounded-[6px] hover:cursor-pointer'>
                <div className=' p-3'>
                  <img src={chapterimg} alt="error" className='group-hover:brightness-0 ' />
                </div>
                <div>Chapter</div>
              </div>
              <div className='help group flex w-full justify-center lg:justify-start p-3 items-center hover:bg-slate-300 hover:text-black rounded-[6px] hover:cursor-pointer'>
                <div className=' p-3'>
                  <img src={helpimg} alt="error" className='group-hover:brightness-0 ' />
                </div>
                <div>Help</div>
              </div>
              <div className='reports group flex w-full justify-center lg:justify-start p-3 items-center hover:bg-slate-300 hover:text-black rounded-[6px] hover:cursor-pointer'>
                <div className=' p-3'>
                  <img src={reportsimg} alt="error" className='group-hover:brightness-0 ' />
                </div>
                <div>Reports</div>
              </div>
              <div className='settings group flex w-full justify-center lg:justify-start p-3 items-center hover:bg-slate-300 hover:text-black rounded-[6px] hover:cursor-pointer'>
                <div className=' p-3'>
                  <img src={settingsimg} alt="error" className='group-hover:brightness-0 ' />
                </div>
                <div>Settings</div>
              </div>
            </div>
          </div>
        </div>
        <div className='rightpart w-full lg:w-4/5 p-4 bg-slate-100 font-noto-sans lg:relative lg:left-[20%] '>
          <div className='navbar flex flex-col md:flex-row w-full items-center justify-between gap-7 md:gap-[5px] mt-3' >
            <div className='container bg-white rounded-[12px] md:w-1/2 '>
              <div className='flex'>
                <div className='p-4'>
                <img src={searchimg} className="hover:cursor-pointer"></img>
                </div>
                <input 
                onChange={handleInput}
                value={searchVal}
                type="text" 
                name="srch" 
                id="srch" 
                placeholder="Search "
                className='w-full rounded-r-[12px] outline-none'
                />
              </div>
            </div>
            <div className='flex justify-around w-full md:w-auto md:w-3/10 md:gap-8 ' >
              <div>
                <img src={helpimg} alt="" className='hover:brightness-0 hover:cursor-pointer' />
              </div>
              <div>
                <img src={msgimg} alt="" className='hover:brightness-0 hover:cursor-pointer'/>
              </div>
              <div>
                <img src={filterimg} alt="" className='hover:brightness-0 hover:cursor-pointer'/>
              </div>
              <div>
                <img src={notimg} alt="" className='hover:brightness-0 hover:cursor-pointer'/>
              </div>
            </div>
            <div className='flex md:w-2/10 items-center font-bold'>
              <div>
                <img src={katicoximg} alt="" className='hover:brightness-75 hover:cursor-pointer'/>
              </div>
              <div>Adeline H. dancy</div>
            </div>
          </div>
          <div className='details mt-4 pt-2 bg-white rounded-[12px] overflow-x-scroll'>
            <div className='flex flex-col sm:flex-row m-4 items-center sm:relative font-bold text-slate-600 gap-2'>
              <div className='w-full sm:w-auto'>
              <select
                value={cohortfilter}
                onChange={handleCohortChanges}
                className="bg-slate-200 hover:bg-slate-300 rounded-[6px] pl-3 pr-2 py-2 hover:text-black outline-none w-full sm:w-auto"
              >
                <option value="">All</option>
                <option value="AY 2024-25">AY 2024-25</option>
                <option value="AY 2023-24">AY 2023-24</option>
              </select>
              </div>
              <div className='w-full sm:w-auto'>
              <select
                value={classfilter}
                onChange={handleClassChanges}
                className="bg-slate-200 hover:bg-slate-300 rounded-[6px] pl-3 pr-2 py-2 hover:text-black outline-none w-full sm:w-auto"
              >
                <option value="">All</option>
                <option value="CBSE 9">CBSE 9</option>
                <option value="CBSE 10">CBSE 10</option>
              </select>
              </div>
              <div className='sm:absolute right-0 w-full sm:w-auto'>
              <Dialog open={isDialogOpen} onOpenChange={(open)=>dispatch(setIsDialogOpen(open))} >
                <DialogTrigger className='group bg-slate-200 flex items-center p-2 rounded-[6px] hover:cursor-pointer hover:bg-slate-300 hover:text-black w-full sm:w-auto justify-center'>
                  <div className='pr-1 ' >
                    <img src={addimg} alt="" className='group-hover:brightness-0' />
                  </div>
                  <div>Add New Student</div>
                </DialogTrigger>
                <DialogContent className='font-noto-sans bg-slate-300'>
                  <DialogHeader className='flex flex-col items-center '>
                    <DialogTitle>Enter Details</DialogTitle>
                    <DialogDescription>
                      <form className='flex flex-col gap-[5px] ' onSubmit={createUser}>
                        <input type="text" name="name" id="name" placeholder='Enter Name' onChange={handleChange} value={user.name} className='h-[25px] outline-none bg-white text-[15px] rounded-[6px] p-2'/>
                        <select name="cohort" id="cohort"  className="border border-gray-300 rounded-[6px] px-3 py-2 outline-none " onChange={handleChange} value={user.cohort}>
                          <option value="" disabled selected>Select Year</option>
                          <option value="AY 2024-25">AY 2024-25</option>
                          <option value="AY 2023-24">AY 2023-24</option>
                        </select>
                        <select
                          name="class"
                          id="class"
                          className="border border-gray-300 rounded-[6px] outline-none px-3 py-2"
                          value={user.class}
                          onChange={handleClassChange}
                        >
                          <option value="" disabled selected>Select Class</option>
                          <option value="CBSE 9">CBSE 9</option>
                          <option value="CBSE 10">CBSE 10</option>
                        </select>

                        {selectedClass && (
                          <div className='flex flex-col font-semibold text-[15px]'> Select Courses:
                            {selectedClass === 'CBSE 9' && (
                              <div className="flex font-medium rounded-[6px] ">
                                <input
                                  type="checkbox"
                                  id="science9"
                                  name="courses"
                                  value="CBSE 9 Science"
                                  onChange={handleSubjectChange}
                                />
                                <label htmlFor="science9"> CBSE 9 Science</label><br />
                                <input
                                  type="checkbox"
                                  id="maths9"
                                  name="courses"
                                  value="CBSE 9 Maths"
                                  onChange={handleSubjectChange}
                                />
                                <label htmlFor="maths9"> CBSE 9 Maths</label><br />
                              </div>
                            )}
                            {selectedClass === 'CBSE 10' && (
                              <div className="flex font-medium rounded-[6px]">
                                <input
                                  type="checkbox"
                                  id="science10"
                                  name="courses"
                                  value="CBSE 10 Science"
                                  onChange={handleSubjectChange}
                                  
                                />
                                <label htmlFor="science10"> CBSE 10 Science</label><br />
                                <input
                                  type="checkbox"
                                  id="maths10"
                                  name="courses"
                                  value="CBSE 10 Maths"
                                  onChange={handleSubjectChange}
                                />
                                <label htmlFor="maths10"> CBSE 10 Maths</label><br />
                              </div>
                            )}
                          </div>
                        )}
                        <div className='font-semibold flex ' >
                          <div className='w-1/4'>Date Joined: </div>
                          <input type="date" name="date_joined" onChange={handleChange} value={user.date_joined} className='font-normal w-3/4 rounded-[6px] p-2' />
                        </div>
                        <div className='flex font-semibold'>
                          <div className='w-1/4'>Last Login:</div> 
                          <input type="datetime-local" name="last_login" onChange={handleChange} value={user.last_login} className='font-normal w-3/4 rounded-[6px] p-2'/>
                        </div>
                        <select name="status" id="status" className="border border-gray-300 rounded px-3 py-2" onChange={handleChange} value={user.status}> 
                          <option value="" disabled selected>Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        <button type='submit' className='bg-slate-400 font-bold mx-auto p-2 rounded-[6px]'>
                          Add Student
                        </button>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              </div>
            </div>
            <div className='table w-full p-4'>
              <table className='w-full '>
                <thead className='text-left '>
                  <tr className=''>
                    <th className='pb-4'>Student Name</th>
                    <th className='pb-4'>Cohort</th>
                    <th className='pb-4'>Courses</th>
                    <th className='pb-4'>Date Joined</th>
                    <th className='pb-4'>Last Login(D & T)</th>
                    <th className='pb-4'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user)=>
                  <tr key={user.id} className='items-center justify-center border-t-2 border-slate-200'>
                    <td className='py-3'>{user.Name}</td>
                    <td className='py-3'>{user.Cohort}</td>
                    <td className='py-3 '>{user.Courses?.join(' ')}</td>
                    <td className='py-3'>{user.Date_joined}</td>
                    <td className='py-3'>{user.Last_login?.replace('T', ' ')}</td>
                    <td className='py-3'>{user.Status}</td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

