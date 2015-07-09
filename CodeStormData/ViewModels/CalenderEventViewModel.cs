﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeStormData.ViewModels
{
    public class CalenderEventViewModel
    {
        public Int64 id { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public string text { get; set; }
        public string rec_type { get; set; }
        public Int64 event_length { get; set; }
        public int event_pid { get; set; }
        public string  color { get; set; }
    }
}
