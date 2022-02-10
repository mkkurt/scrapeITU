class Course {
  constructor(
    crn,
    code,
    title,
    instructor,
    building,
    day,
    time,
    room,
    capacity,
    restrictions
  ) {
    this.CRN = crn;
    this.Code = code;
    this.Title = title;
    this.Instructor = instructor;
    this.Building = building;
    this.Day = day;
    this.Room = room;
    this.Time = time;
    this.Capacity = capacity;
    this.Restrictions = restrictions;
  }
}

export default Course;
