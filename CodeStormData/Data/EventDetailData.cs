﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeStormData.ViewModels;

namespace CodeStormData.Data
{
    public class EventDetailData
    {

        public void AddEventDetail(EventDetail eventDetail)
        {
            using (CodeStormDBEntities db = new CodeStormDBEntities())
            {
                db.EventDetails.Add(eventDetail);
                db.SaveChanges();
            }
        }

        public EventDetail GetEventDetail(Int64 id)
        {
            using (CodeStormDBEntities db = new CodeStormDBEntities())
            {
                return db.EventDetails.Where(e => e.Id == id).FirstOrDefault();
            }
        }

        public int UdateEventDetail(EventDetail ev)
        {
            using (CodeStormDBEntities db = new CodeStormDBEntities())
            {
                var res = db.EventDetails.Where(e => e.Id == ev.Id).FirstOrDefault();
                if (res != null)
                {
                    res.Description = ev.Description;
                    res.Location = ev.Location;
                    res.Latitude = ev.Latitude;
                    res.Longitude = ev.Longitude;
                    return db.SaveChanges();
                }
                return 0;
            }
        }

        public EventSearchViewModel GetEventDetails(Int64 eventid)
        {
            using (CodeStormDBEntities db = new CodeStormDBEntities())
            {
                var res = from e in db.Events.AsEnumerable()
                    join d in db.EventDetails.AsEnumerable() on e.Id equals d.Id
                    where e.Id == eventid
                    select new EventSearchViewModel()
                    {
                        id = e.Id,
                        text = e.Text,
                        description = d.Description,
                        startdate = e.StartDate.ToString("dd-MM-yyyy"),
                        enddate = e.EndDate.ToString("dd-MM-yyyy"),
                        starttime = e.StartDate.ToString("hh:mm tt"),
                        endtime = e.EndDate.ToString("hh:mm tt")
                    };
                return res.FirstOrDefault();
            }
        }
    }
}
