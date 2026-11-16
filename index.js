const { remote } = require('webdriverio');
const crypto = require('crypto');

// script : npm start
// ============================================================================
// LOOP CONFIGURATION
// ============================================================================
const TOTAL_ENTRIES_TO_RUN = 80; // Change as needed

// ============================================================================
// GLOBAL DATE CONFIGURATION
// Format: "DD/MM/YYYY" (e.g., "14/11/2026") or null to use current date
// ============================================================================
const GLOBAL_CUSTOM_DATE = null // use null for default; 


// ============================================================================
// APPIUM & WEBDRIVERIO CONFIGURATION
// ============================================================================
const opts = {
    path: '/',
    port: 4723,
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'AndroidDevice',
        'appium:noReset': true,
        'appium:dontStopAppOnReset': true,
        'appium:disableWindowAnimation': true,
        'appium:skipServerInstallation': true,
        'appium:skipDeviceInitialization': true,
        'appium:ignoreUnimportantViews': false,
        // --- ADD THESE SPEED SETTINGS ---
        'appium:settings[waitForIdleTimeout]': 10,       // Reduces idle sync waiting time
        'appium:settings[actionAcknowledgmentTimeout]': 20, // Cuts down click response wait
        'appium:newCommandTimeout': 120
    }
};


// ============================================================================
// STEP TOGGLES
// ============================================================================
const FLOW_STEPS = {
    runEnrollment: true,             
    runCbacPartA: true,              
    runCbacPartB: true,              
    runCbacPartC: true,              
    runCbacPartD: true,              
    runPersonalExam: true,           
    runPersonalHistory: true,        
    runHypertensionScreening: true,  
    runDiabetesScreening: true,      
    runOralScreening: true,          
    runExitAndResetToStart: true     
};

// ============================================================================
// STATIC TEST DATA & CONSTANTS
// ============================================================================
const MALE_NAMES = [
    // 1-25
    "Aaditya Kumar", "Aashish Singh", "Abhay Paswan", "Abhijit Rai", "Abhimanyu Sahni",
    "Abhishek Mahto", "Achal Thakur", "Adarsh Yadav", "Ajit Jha", "Akash Ojha",
    "Akhilesh Saha", "Akshat Kumar", "Algu Singh", "Amarkant Paswan", "Amarjeet Rai",
    "Ambika Sahni", "Amrit Mahto", "Anand Thakur", "Anant Yadav", "Animesh Jha",
    "Anirudh Ojha", "Anjani Saha", "Ankit Kumar", "Anmol Singh", "Ansul Paswan",

    // 26-50
    "Anugrah Rai", "Anuj Sahni", "Anupam Mahto", "Anurag Thakur", "Apoorv Yadav",
    "Arjun Jha", "Arvind Ojha", "Aryan Saha", "Ashutosh Kumar", "Atul Singh",
    "Avinash Paswan", "Awadh Rai", "Ayush Sahni", "Bablu Mahto", "Badrinath Thakur",
    "Bahadur Yadav", "Baijnath Jha", "Bakshi Ojha", "Balak Ram Saha", "Balbhadra Kumar",
    "Balgovind Singh", "Balmiki Paswan", "Baleshwar Rai", "Banke Bihari Sahni", "Banshi Mahto",

    // 31-75
    "Basant Kumar", "Basudev Singh", "Bateshwar Paswan", "Bhagirath Rai", "Bhanu Pratap Sahni",
    "Bhardwaj Mahto", "Bhaskar Thakur", "Bhavani Yadav", "Bhikham Jha", "Bhikhari Ojha",
    "Bhojraj Saha", "Bhuvaneshwar Kumar", "Bhuvnesh Singh", "Bijendra Paswan", "Bikash Rai",
    "Bipin Sahni", "Birendra Mahto", "Bishnudeo Thakur", "Brahmadev Yadav", "Brajkishore Jha",
    "Brijmohan Ojha", "Brijnandan Saha", "Buddhi Ram Kumar", "Chandra Bhushan Singh", "Chandra Deo Paswan",
    "Chandra Kishor Rai", "Chandra Shekhar Sahni", "Chandradev Mahto", "Chandrama Thakur", "Chandrika Yadav",
    "Charan Das Jha", "Chetan Ojha", "Chhatradhar Saha", "Chhedi Ram Kumar", "Daljit Singh",
    "Damodar Paswan", "Dara Singh Rai", "Dashai Sahni", "Dataram Mahto", "Dayanidhi Thakur",

    // 76-100
    "Debu Kumar", "Deepanjan Singh", "Deenabandhu Paswan", "Deendayal Rai", "Deshraj Sahni",
    "Devanand Mahto", "Devendra Nath Thakur", "Dhaneshwar Yadav", "Dhaniram Jha", "Dharambir Ojha",
    "Dharamnath Saha", "Dharamvir Kumar", "Dharmaraj Singh", "Dharmen Paswan", "Dhrub Rai",
    "Digambar Sahni", "Digvijay Mahto", "Dilip Thakur", "Dinanath Yadav", "Dineshwar Jha",
    "Diwakar Ojha", "Doman Saha", "Dukhi Ram Kumar", "Dukhdev Singh", "Durga Das Paswan",

    // 101-125
    "Durgeshwar Rai", "Dwarika Sahni", "Eshwar Mahto", "Fagu Thakur", "Fakir Chand Yadav",
    "Phoolchand Jha", "Gabbar Singh Ojha", "Gajadhar Saha", "Gajendra Kumar", "Ganeshwar Singh",
    "Gangadhar Paswan", "Gauri Shankar Rai", "Gautam Sahni", "Ghasi Ram Mahto", "Girija Prasad Thakur",
    "Girraj Yadav", "Gopal Das Jha", "Gopinath Ojha", "Gorakh Nath Saha", "Govardhan Kumar",
    "Gulabchand Singh", "Gulab Rai Paswan", "Gunjan Rai", "Gurdayal Sahni", "Guru Prasad Mahto",

    // 126-150
    "Harcharan Thakur", "Hardayal Yadav", "Hare Ram Jha", "Hari Bhajan Ojha", "Hari Kishor Saha",
    "Harikishan Kumar", "Harishchandra Singh", "Harkhu Paswan", "Harmesh Rai", "Harnandan Sahni",
    "Harshvardhan Mahto", "Hemlal Thakur", "Hemraj Yadav", "Hira Das Jha", "Hiralal Ojha",
    "Hulas Saha", "Indradev Kumar", "Indrajit Singh", "Ishwari Paswan", "Jadunath Rai",
    "Jagat Narayan Sahni", "Jagdeo Mahto", "Jagdishwar Thakur", "Jageshwar Yadav", "Jago Jha",

    // 151-175
    "Jai Bhagwan Ojha", "Jai Prakash Saha", "Jai Ram Kumar", "Jaimangal Singh", "Jainandan Paswan",
    "Jaiprakash Rai", "Jairam Sahni", "Jaleshwar Mahto", "Jamuna Thakur", "Janak Yadav",
    "Janardan Jha", "Jangali Ojha", "Janki Raman Saha", "Jasai Kumar", "Jaswant Singh",
    "Jatan Paswan", "Jatashankar Rai", "Jatru Sahni", "Jawahar Mahto", "Jayant Thakur",
    "Jayshankar Yadav", "Jhaver Jha", "Jibachh Ojha", "Jitendra Nath Saha", "Jugal Kumar",

    // 176-200
    "Jugeshwar Singh", "Kailash Paswan", "Kalicharan Rai", "Kalki Sahni", "Kalyan Mahto",
    "Kamal Kishor Thakur", "Kamala Prasad Yadav", "Kameshwar Jha", "Kanhaiya Ojha", "Kankal Saha",
    "Kanta Prasad Kumar", "Kashi Singh", "Kashinath Paswan", "Kedarnath Rai", "Kesho Sahni",
    "Kewal Mahto", "Khadag Bahadur Thakur", "Khattu Yadav", "Khelawan Jha", "Khedan Ojha",
    "Khublal Saha", "Kishore Kumar Singh", "Kishori Paswan", "Kishun Rai", "Kuldip Sahni",
    
    // 201-225
    "Kumar Gaurav Mahto", "Kumresh Thakur", "Kunjilal Yadav", "Kushal Jha", "Lachhi Ojha",
    "Lachhman Saha", "Ladan Kumar", "Lagan Singh", "Laganjee Paswan", "Lakhindra Rai",
    "Lakhi Sahni", "Lakhman Mahto", "Lakshman Thakur", "Lal Chand Yadav", "Lal Ji Jha",
    "Lalan Ojha", "Laldas Saha", "Lalmani Kumar", "Lalta Singh", "Laltu Paswan",
    "Madhav Prasad Rai", "Madhav Sahni", "Madhu Sudan Mahto", "Mahabir Thakur", "Mahadev Yadav",

    // 226-250
    "Mahant Jha", "Mahesh Ojha", "Mahimanshu Saha", "Makkhan Kumar", "Malaram Singh",
    "Mallu Paswan", "Malti Rai", "Manbodh Sahni", "Mandal Mahto", "Mangal Prasad Thakur",
    "Mangru Yadav", "Manibhushan Jha", "Manikant Ojha", "Manohar Saha", "Manoj Kumar Singh",
    "Mansaram Paswan", "Markandeya Rai", "Mathura Sahni", "Meghnath Mahto", "Mihir Thakur",
    "Milind Yadav", "Minaketan Jha", "Mithilesh Ojha", "Mohan Das Saha", "Mohar Ram Kumar",

    // 251-275
    "Moti Lal Singh", "Motichand Paswan", "Mrigank Rai", "Mrityunjay Sahni", "Mukteshwar Mahto",
    "Mukund Thakur", "Muni Lal Yadav", "Munna Kumar Jha", "Munnilal Ojha", "Murari Saha",
    "Murli Manohar Kumar", "Nagendra Singh", "Nageshwar Paswan", "Nand Kishor Rai", "Nandlal Sahni",
    "Nandnandan Mahto", "Naresh Thakur", "Narayan Prasad Yadav", "Narendra Jha", "Narendra Nath Ojha",
    "Narsingh Saha", "Nathuni Kumar", "Navin Singh", "Nawal Kishore Paswan", "Nawalkishore Rai",

    // 276-300
    "Niraj Sahni", "Niramal Mahto", "Nirbhay Thakur", "Nirmal Yadav", "Nishant Jha",
    "Nitesh Ojha", "Nityanand Saha", "Om Prakash Kumar", "Pachkauri Singh", "Padmakar Paswan",
    "Palakdhari Rai", "Pancham Sahni", "Panchratan Mahto", "Pandav Thakur", "Panchanan Yadav",
    "Pankaj Kumar Jha", "Paramhans Ojha", "Paras Nath Saha", "Parasram Kumar", "Parmanand Singh",
    "Pasupati Paswan", "Patanjali Rai", "Patiram Sahni", "Phagu Mahto", "Phalendra Thakur",
    
    // 301-325
    "Phool Chandra Yadav", "Phulendra Jha", "Piyush Ojha", "Pooja Saha", "Prabhat Kumar Singh",
    "Prabhu Dayal Paswan", "Prabhu Narayan Rai", "Pradeep Sahni", "Prafulla Mahto", "Prajapati Thakur",
    "Prakash Yadav", "Pramod Jha", "Pranab Ojha", "Prannath Saha", "Pratap Kumar Singh",
    "Pravin Paswan", "Prem Chand Rai", "Prem Kumar Sahni", "Pritam Mahto", "Priyadarshi Thakur",
    "Purna Chandra Yadav", "Purna Jha", "Purushottam Ojha", "Pyarilal Saha", "Radha Krishna Kumar",

    // 326-350
    "Radhe Shyam Singh", "Radheshyam Paswan", "Raghav Prasad Rai", "Raghubir Sahni", "Raghunath Mahto",
    "Raghuvir Thakur", "Raj Kumar Yadav", "Raja Ram Jha", "Rajabhaiyya Ojha", "Rajak Saha",
    "Rajan Kumar Singh", "Rajaram Paswan", "Rajdev Rai", "Rajendra Prasad Sahni", "Rajeshwar Mahto",
    "Rajkishor Thakur", "Rajkumar Yadav", "Rajnish Jha", "Rajpati Ojha", "Raju Saha",
    "Rakesh Kumar Singh", "Rakhahari Paswan", "Ram Awtar Rai", "Ram Bachan Sahni", "Ram Balak Mahto",

    // 351-375
    "Ram Brish Thakur", "Ram Chandra Yadav", "Ram Charitra Jha", "Ram Das Ojha", "Ram Dhani Saha",
    "Ram Dular Kumar", "Ram Ishwar Singh", "Ram Jatan Paswan", "Ram Janam Rai", "Ram Khelawan Sahni",
    "Ram Kripal Mahto", "Ram Kumar Thakur", "Ram Lakhan Yadav", "Ram Naresh Jha", "Ram Pujan Ojha",
    "Ram Ratan Saha", "Ram Sajiwan Kumar", "Ram Sevak Singh", "Ram Sharan Paswan", "Ram Sundar Rai",
    "Ram Surat Sahni", "Ram Swaroop Mahto", "Ram Vilas Thakur", "Rama Shankar Yadav", "Ramakant Jha",

    // 376-400
    "Ramanand Ojha", "Ramanuj Saha", "Ramashish Kumar", "Ramashray Singh", "Ramayan Paswan",
    "Rameshwar Rai", "Ramhit Sahni", "Ramjash Mahto", "Rampati Thakur", "Ramphal Yadav",
    "Ramprasad Jha", "Ramsewak Ojha", "Ramsurat Saha", "Rana Pratap Kumar", "Ranjeet Singh",
    "Ranjit Paswan", "Rash Bihari Rai", "Ratan Sahni", "Rathindra Mahto", "Ravindra Thakur",
    "Roopchand Yadav", "Rudra Pratap Jha", "Rupesh Ojha", "Sachidanand Saha", "Sadhu Ram Kumar",

    // 401-425
    "Sahdeo Singh", "Sajjan Paswan", "Sakaldeep Rai", "Saligram Sahni", "Samarjit Mahto",
    "Sambhu Thakur", "Sampat Yadav", "Samsher Jha", "Sanatan Ojha", "Sanchit Saha",
    "Sandal Kumar", "Sanjay Kumar Singh", "Sankatha Paswan", "Sankat Mochan Rai", "Sant Lal Sahni",
    "Santosh Kumar Mahto", "Saryu Prasad Thakur", "Satadal Yadav", "Satadeo Jha", "Satish Chandra Ojha",
    "Satya Narayan Saha", "Satyadeo Kumar", "Satyendra Nath Singh", "Saudan Paswan", "Shambhu Nath Rai",

    // 426-450
    "Shankara Sahni", "Shankarnath Mahto", "Shashi Bhushan Thakur", "Sheo Bachan Yadav", "Sheo Kumar Jha",
    "Sheo Pujan Ojha", "Sheo Ratan Saha", "Sheo Shankar Kumar", "Sheobalak Singh", "Sheodhyan Paswan",
    "Sheomangal Rai", "Sheomuni Sahni", "Sheopujan Mahto", "Sheoratan Thakur", "Shesh Nath Yadav",
    "Sher Singh Jha", "Shibu Ojha", "Shital Saha", "Shiv Balak Kumar", "Shiv Charan Singh",
    "Shiv Dayal Paswan", "Shiv Gopal Rai", "Shiv Kumar Sahni", "Shiv Mangal Mahto", "Shiv Pujan Thakur",

    // 451-475
    "Shiv Ratan Yadav", "Shiv Shambhu Jha", "Shiv Shankar Ojha", "Shiv Subhag Saha", "Shivdhar Kumar",
    "Shivgovind Singh", "Shivkant Paswan", "Shivmangal Rai", "Shivnandan Sahni", "Shivnath Mahto",
    "Shobhnath Thakur", "Shravan Kumar Yadav", "Shree Kant Jha", "Shreeram Ojha", "Shyamlal Saha",
    "Shyamnandan Kumar", "Sita Ram Singh", "Sital Paswan", "Sohan Lal Rai", "Sombir Sahni",
    "Sonelal Mahto", "Srinarayan Thakur", "Srinivas Yadav", "Subal Jha", "Subash Ojha",

    // 476-500
    "Subedar Saha", "Subhash Chandra Kumar", "Sudama Singh", "Sudhir Kumar Paswan", "Sukhdeo Rai",
    "Sukhlal Sahni", "Sukhnandan Mahto", "Sunder Lal Thakur", "Suneel Yadav", "Sunil Kumar Jha",
    "Suraj Mal Ojha", "Surendra Kumar Saha", "Suresh Prasad Kumar", "Suryamani Singh", "Suryapratap Paswan",
    "Swaraj Rai", "Tarachand Sahni", "Tarakeshwar Mahto", "Tej Bahadur Thakur", "Tejpal Yadav",
    "Thakur Das Jha", "Tribhuwan Ojha", "Tulsidas Saha", "Udai Bhan Kumar", "Uday Shankar Singh",

    // 501-525
    "Udit Narayan Paswan", "Ugra Sen Rai", "Ujagar Sahni", "Umakant Mahto", "Upendra Thakur",
    "Uttam Yadav", "Vachaspati Jha", "Vaidyanath Ojha", "Vashisht Saha", "Ved Prakash Kumar",
    "Vibhuti Singh", "Vidyanand Paswan", "Vijay Bahadur Rai", "Vijay Kumar Sahni", "Vijay Shankar Mahto",
    "Vikramaditya Thakur", "Vinay Kumar Yadav", "Virendra Jha", "Vishnu Ojha", "Vishwanath Saha",
    "Vyas Muni Kumar", "Yaduvansh Singh", "Yogendra Paswan", "Yogeshwar Rai", "Zalim Sahni",

    // 526-550
    "Zorawar Mahto", "Achyutanand Thakur", "Aditya Narayan Yadav", "Amalendu Jha", "Ambika Prasad Ojha",
    "Anand Kishor Saha", "Anant Kumar", "Anil Kumar Singh", "Aniruddh Paswan", "Anjani Kumar Rai",
    "Anugrah Sahni", "Anuj Mahto", "Anupam Thakur", "Anurag Yadav", "Apoorva Jha",
    "Arun Kumar Ojha", "Arvind Saha", "Ashok Kumar Singh", "Ashutosh Paswan", "Atul Kumar Rai",
    "Avinash Sahni", "Awadhesh Mahto", "Ayush Thakur", "Bablu Kumar Yadav", "Badrinath Jha",

    // 551-575
    "Bahadur Singh Ojha", "Baijnath Saha", "Balak Ram Kumar", "Balbhadra Singh", "Balgovind Paswan",
    "Balmiki Rai", "Baleshwar Sahni", "Banke Bihari Mahto", "Banshi Thakur", "Basant Yadav",
    "Basudev Jha", "Bateshwar Ojha", "Bhagirath Saha", "Bhanu Pratap Kumar", "Bhardwaj Singh",
    "Bhaskar Paswan", "Bhavani Rai", "Bhikham Sahni", "Bhikhari Mahto", "Bhojraj Thakur",
    "Bhuvaneshwar Yadav", "Bhuvnesh Jha", "Bijendra Ojha", "Bikash Saha", "Bipin Kumar",

    // 576-600
    "Birendra Singh", "Bishnudeo Paswan", "Brahmadev Rai", "Brajkishore Sahni", "Brijmohan Mahto",
    "Brijnandan Thakur", "Buddhi Ram Yadav", "Chandra Bhushan Jha", "Chandra Deo Ojha", "Chandra Kishor Saha",
    "Chandra Shekhar Kumar", "Chandradev Singh", "Chandrama Paswan", "Chandrika Rai", "Charan Das Sahni",
    "Chetan Mahto", "Chhatradhar Thakur", "Chhedi Ram Yadav", "Daljit Jha", "Damodar Ojha",
    "Dara Singh Saha", "Dashai Kumar", "Dataram Singh", "Dayanidhi Paswan", "Debu Rai",

    // 601-625
    "Deepanjan Sahni", "Deenabandhu Mahto", "Deendayal Thakur", "Deshraj Yadav", "Devanand Jha",
    "Devendra Nath Ojha", "Dhaneshwar Saha", "Dhaniram Kumar", "Dharambir Singh", "Dharamnath Paswan",
    "Dharamvir Rai", "Dharmaraj Sahni", "Dharmen Mahto", "Dhrub Thakur", "Digambar Yadav",
    "Digvijay Jha", "Dilip Ojha", "Dinanath Saha", "Dineshwar Kumar", "Diwakar Singh",
    "Doman Paswan", "Dukhi Ram Rai", "Dukhdev Sahni", "Durga Das Mahto", "Durgeshwar Thakur",

    // 626-650
    "Dwarika Yadav", "Eshwar Jha", "Fagu Ojha", "Fakir Chand Saha", "Phoolchand Kumar",
    "Gabbar Singh", "Gajendra Paswan", "Ganeshwar Rai", "Gangadhar Sahni", "Gauri Shankar Mahto",
    "Gautam Thakur", "Ghasi Ram Yadav", "Girija Prasad Jha", "Girraj Ojha", "Gopal Das Saha",
    "Gopinath Kumar", "Gorakh Nath Singh", "Govardhan Paswan", "Gulabchand Rai", "Gulab Rai Sahni",
    "Gunjan Mahto", "Gurdayal Thakur", "Guru Prasad Yadav", "Harcharan Jha", "Hardayal Ojha",

    // 651-675
    "Hare Ram Saha", "Hari Bhajan Kumar", "Hari Kishor Singh", "Harikishan Paswan", "Harishchandra Rai",
    "Harkhu Sahni", "Harmesh Mahto", "Harnandan Thakur", "Harshvardhan Yadav", "Hemlal Jha",
    "Hemraj Ojha", "Hira Das Saha", "Hiralal Kumar", "Hulas Singh", "Indradev Paswan",
    "Indrajit Rai", "Ishwari Sahni", "Jadunath Mahto", "Jagat Narayan Thakur", "Jagdeo Yadav",
    "Jagdishwar Jha", "Jageshwar Ojha", "Jago Saha", "Jai Bhagwan Kumar", "Jai Prakash Singh",

    // 676-700
    "Jai Ram Paswan", "Jaimangal Rai", "Jainandan Sahni", "Jaiprakash Mahto", "Jairam Thakur",
    "Jaleshwar Yadav", "Jamuna Jha", "Janak Ojha", "Janardan Saha", "Jangali Kumar",
    "Janki Raman Singh", "Jasai Paswan", "Jaswant Rai", "Jatan Sahni", "Jatashankar Mahto",
    "Jatru Thakur", "Jawahar Yadav", "Jayant Jha", "Jayshankar Ojha", "Jhaver Saha",
    "Jibachh Kumar", "Jitendra Nath Singh", "Jugal Paswan", "Jugeshwar Rai", "Kailash Sahni",

    // 1-25
    "Rajesh Kumar", "Amit Singh", "Sanjay Paswan", "Vijay Rai", "Manoj Sahni",
    "Sunil Mahto", "Ramesh Thakur", "Dharmendra Yadav", "Pankaj Jha", "Anil Ojha",
    "Ravi Saha", "Deepak Kumar", "Suresh Singh", "Vikas Paswan", "Rakesh Rai",
    "Alok Sahni", "Mukesh Mahto", "Santosh Thakur", "Ajay Yadav", "Pravin Jha",
    "Bikram Ojha", "Dinesh Saha", "Ashok Kumar", "Gaurav Singh", "Manish Paswan",

    // 26-50
    "Ram Kishor Rai", "Mahendra Sahni", "Hari Om Mahto", "Shyam Lal Thakur", "Basant Yadav",
    "Subhash Jha", "Devendra Ojha", "Satish Saha", "Lallan Kumar", "Ganesh Singh",
    "Jagdish Paswan", "Narendra Rai", "Vinod Sahni", "Arun Mahto", "Kameshwar Thakur",
    "Babulal Yadav", "Pramod Jha", "Gautam Ojha", "Surendra Saha", "Shambhu Kumar",
    "Maheshwar Singh", "Phool Chand Paswan", "Kailash Rai", "Umesh Sahni", "Sitaram Mahto",

    // 51-75
    "Satyendra Thakur", "Jitendra Yadav", "Bhola Jha", "Radhey Shyam Ojha", "Badri Saha",
    "Kishore Kumar", "Rajendra Singh", "Nand Paswan", "Ram Lakhan Rai", "Shriniwas Sahni",
    "Ramswaroop Mahto", "Mithilesh Thakur", "Tribhuvan Yadav", "Dukhi Jha", "Bharat Ojha",
    "Ramlallu Saha", "Awadhesh Kumar", "Ganga Singh", "Suraj Paswan", "Hariram Rai",
    "Balram Sahni", "Janardan Mahto", "Parameshwar Thakur", "Chhedi Yadav", "Brijesh Jha",

    // 76-100
    "Bhairav Ojha", "Daya Shankar Saha", "Maniram Kumar", "Shiv Pujan Singh", "Kishan Paswan",
    "Girija Rai", "Chhote Lal Sahni", "Sukhdev Mahto", "Rambriksh Thakur", "Paras Nath Yadav",
    "Nageshwar Jha", "Raghuveer Ojha", "Kalu Saha", "Sohan Kumar", "Jagat Singh",
    "Shiv Shankar Paswan", "Dhananjay Rai", "Beni Prasad Sahni", "Bhagwan Das Mahto", "Rajdev Thakur",
    "Surya Bhan Yadav", "Kedar Nath Jha", "Moti Ojha", "Lal Bahadur Saha", "Dinabandhu Kumar",

    // 101-125
    "Amresh Singh", "Jugal Kishor Paswan", "Ram Naresh Rai", "Shambhu Sahni", "Kamleshwar Mahto",
    "Bhagwati Thakur", "Nirmal Yadav", "Doodhnath Jha", "Lakhpat Ojha", "Tej Bahadur Saha",
    "Ram Sharan Kumar", "Subedar Singh", "Rajaram Paswan", "Dukharan Rai", "Ghanaram Sahni",
    "Bhole Shankar Mahto", "Mangal Dev Thakur", "Vidyadhar Yadav", "Kishuni Jha", "Lala Ram Ojha",
    "Sukhram Saha", "Shiv Charan Kumar", "Tirath Singh", "Harihar Paswan", "Deep Chand Rai",

    // 126-150
    "Hira Sahni", "Prem Chand Mahto", "Mahabir Thakur", "Shiv Shambhu Yadav", "Babu Ram Jha",
    "Nanku Ojha", "Somaru Saha", "Raghunath Kumar", "Janki Singh", "Prabhu Paswan",
    "Devraj Rai", "Dharam Sahni", "Balkishan Mahto", "Gopichand Thakur", "Sundar Yadav",
    "Ram Vilas Jha", "Kameshwar Ojha", "Gaurishankar Saha", "Narayan Kumar", "Shripat Singh",
    "Bhola Nath Paswan", "Ram Chander Rai", "Hardev Sahni", "Rupchand Mahto", "Madan Mohan Thakur",

    // 151-175
    "Parvati Nandan Yadav", "Ram Jha", "Kripa Shankar Ojha", "Sheo Prasad Saha", "Ganga Kumar",
    "Sadhu Singh", "Baliram Paswan", "Lakhan Rai", "Vaidyanath Sahni", "Badri Mahto",
    "Bindeshwar Thakur", "Ramashray Yadav", "Chandra Bhan Jha", "Beni Ojha", "Shankar Saha",
    "Nathuni Kumar", "Dukhi Singh", "Jagannath Paswan", "Ghanashyam Rai", "Binda Din Sahni",
    "Ram Asrey Mahto", "Sitaram Thakur", "Paras Yadav", "Vishwa Nath Jha", "Suraj Ojha",

    // 176-200
    "Ram Briksh Saha", "Mahadev Kumar", "Sheopujan Singh", "Hari Paswan", "Lalta Rai",
    "Devi Sharan Sahni", "Jagan Mahto", "Babulal Thakur", "Nand Kishor Yadav", "Kailash Jha",
    "Somnath Ojha", "Dhanpat Saha", "Ganga Kumar", "Jagdev Singh", "Kanhaiya Paswan",
    "Shiv Rai", "Ram Balak Sahni", "Radhe Mohan Mahto", "Brij Thakur", "Munna Yadav",
    "Suraj Jha", "Shriram Ojha", "Subhash Saha", "Kishan Kumar", "Ram Bahadur Singh",

    // 201-225
    "Brijnandan Paswan", "Chhatradhar Rai", "Dashrath Sahni", "Dayanand Mahto", "Deen Dayal Thakur",
    "Dharmjit Yadav", "Durgesh Jha", "Fakirchand Ojha", "Ghanshyam Saha", "Giridhar Kumar",
    "Gokul Singh", "Gopal Paswan", "Govind Rai", "Gulab Sahni", "Hanuman Mahto",
    "Hardayal Thakur", "Harihar Yadav", "Harnam Jha", "Hemant Ojha", "Hiralal Saha",
    "Ishwar Kumar", "Jagdish Singh", "Jai Ram Paswan", "Jang Bahadur Rai", "Jaswant Sahni",

    // 226-250
    "Jata Shankar Mahto", "Jitendra Thakur", "Joginder Yadav", "Kalyan Jha", "Kamesh Ojha",
    "Kanhaiya Saha", "Kashi Nath Kumar", "Khublal Singh", "Kunj Bihari Paswan", "Lakhan Rai",
    "Lalji Sahni", "Madhav Mahto", "Mahesh Thakur", "Makhan Yadav", "Mangal Jha",
    "Maniram Ojha", "Mansingh Saha", "Mathura Kumar", "Meghnath Singh", "Mohan Paswan",
    "Moti Ram Rai", "Mukhtiar Sahni", "Nagendra Mahto", "Nandlal Thakur", "Narayan Yadav",

    // 251-275
    "Nathuni Jha", "Navneet Ojha", "Nawal Saha", "Niranjan Kumar", "Nitish Singh",
    "Om Prakash Paswan", "Paramhans Rai", "Paras Nath Sahni", "Phoolchand Mahto", "Piyush Thakur",
    "Prabhat Yadav", "Puran Jha", "Purushottam Ojha", "Pyare Lal Saha", "Radhe Shyam Kumar",
    "Raghav Singh", "Raghubir Paswan", "Raj Kumar Rai", "Rajaram Sahni", "Rajendra Mahto",
    "Rajeshwar Thakur", "Rajnish Yadav", "Raju Jha", "Ram Awtar Ojha", "Ram Bachan Saha",
    
    // 276-300
    "Ram Brish", "Ram Charitra", "Ram Das", "Ram Dhani", "Ram Dular",
    "Ram Jatan", "Ram Kewal", "Ram Kripal", "Ram Murat", "Ram Pujan",
    "Ram Ratan", "Ram Sajiwan", "Ram Sevak", "Ram Sundar", "Ram Surat",
    "Ramanand Kumar", "Ramanuj Singh", "Ramayan Paswan", "Rameshwar Rai", "Ramhit Sahni",
    "Rampati Mahto", "Ramphal Thakur", "Ramprasad Yadav", "Ramsewak Jha", "Ramsurat Ojha",

    // 301-325
    "Rana Pratap Saha", "Ranjit Kumar", "Rash Bihari Singh", "Ratan Paswan", "Ravindra Rai",
    "Roopchand Sahni", "Sadhu Mahto", "Sahdev Thakur", "Sajjan Yadav", "Sakaldeep Jha",
    "Samarjit Ojha", "Sampat Saha", "Samsher Kumar", "Sankatha Singh", "Sankat Mochan Paswan",
    "Sardar Rai", "Saryu Sahni", "Satadeo Mahto", "Satish Chandra Thakur", "Satyadeo Yadav",
    "Satyendra Jha", "Saudan Ojha", "Shambhu Nath Saha", "Shankara Kumar", "Sheo Shankar Singh",

    // 326-350
    "Sheoratan Paswan", "Sher Singh Rai", "Shibu Sahni", "Shital Mahto", "Shiv Balak Thakur",
    "Shiv Dayal Yadav", "Shiv Pujan Jha", "Shiv Ratan Ojha", "Shivnath Saha", "Shobhnath Kumar",
    "Shravan Singh", "Shree Kant Paswan", "Shyam Bihari Rai", "Shyam Nandan Sahni", "Shyam Sunder Mahto",
    "Sita Ram Thakur", "Sital Yadav", "Sohan Jha", "Sombir Ojha", "Sonelal Saha",
    "Subhash Kumar", "Sudama Singh", "Sudhir Paswan", "Sukhdeo Rai", "Sukhlal Sahni",

    // 351-375
    "Sukhnandan Mahto", "Sunder Thakur", "Suneel Yadav", "Suraj Mal Jha", "Surendra Ojha",
    "Suresh Saha", "Suryamani Kumar", "Suryapratap Singh", "Swaraj Paswan", "Tarachand Rai",
    "Tarakeshwar Sahni", "Tejpal Mahto", "Thakur Das Thakur", "Tribhuwan Yadav", "Tulsidas Jha",
    "Udai Bhan Ojha", "Uday Shankar Saha", "Udit Kumar", "Ugra Sen Singh", "Ujagar Paswan",
    "Umakant Rai", "Upendra Sahni", "Uttam Mahto", "Vachaspati Thakur", "Vaidyanath Yadav",

    // 376-400
    "Vashisht Jha", "Ved Prakash Ojha", "Vibhuti Saha", "Vidyanand Kumar", "Vijay Bahadur Singh",
    "Vijay Shankar Paswan", "Vikramaditya Rai", "Vinay Sahni", "Virendra Mahto", "Vishnu Thakur",
    "Vishwanath Yadav", "Vyas Muni Jha", "Yaduvansh Ojha", "Yogendra Saha", "Yogeshwar Kumar",
    "Zalim Singh", "Zorawar Paswan", "Achyutanand Rai", "Aditya Sahni", "Amal Mahto",
    "Ambika Thakur", "Anand Yadav", "Anant Jha", "Anil Ojha", "Aniruddh Saha"

];

const FEMALE_NAMES = [
    // 1-25 (Reference Batch)
    "Sunita Devi", "Anita Sharma", "Pooja Devi", "Rekha Kumari", "Manju Devi",
    "Suman Lata", "Kiran Devi", "Geeta Sharma", "Seema Kumari", "Asha Devi",
    "Usha Devi", "Meena Kumari", "Rita Devi", "Sangita Sharma", "Shanti Devi",
    "Kavita Kumari", "Sarita Devi", "Rinku Devi", "Mamta Kumari", "Priyanka Sharma",
    "Shobha Devi", "Bina Devi", "Sushila Devi", "Nirmala Kumari", "Poonam Devi",

    // 26-50
    "Phoolmati Devi", "Basanti Devi", "Ramvati Kumari", "Munni Devi", "Phoolwa Devi",
    "Kusum Lata", "Kanti Devi", "Savitri Devi", "Kaushalya Devi", "Parvati Devi",
    "Durga Kumari", "Ganga Devi", "Bhagwati Devi", "Lakshminia Devi", "Sheela Kumari",
    "Janki Devi", "Anarkali Devi", "Guddi Kumari", "Lalita Devi", "Kamla Devi",
    "Radha Devi", "Premwati Kumari", "Vidya Devi", "Kalawati Devi", "Raj Kumari",

    // 51-75
    "Champa Devi", "Dropadi Devi", "Indu Kumari", "Bachhi Devi", "Kunti Devi",
    "Saraswati Devi", "Tara Devi", "Chameli Devi", "Chandrawati Kumari", "Lilawati Devi",
    "Premila Devi", "Subhadra Devi", "Kewala Devi", "Badami Devi", "Shakuntala Kumari",
    "Bimla Devi", "Malti Devi", "Gayatri Devi", "Santoshi Kumari", "Sonmati Devi",
    "Sharda Devi", "Maya Devi", "Pushpa Kumari", "Kailashi Devi", "Dhanwanti Devi",

    // 76-100
    "Chinta Devi", "Dukhni Devi", "Gyanmati Kumari", "Shanti Lata", "Prabhavati Devi",
    "Sita Devi", "Sita Kumari", "Bhanumati Devi", "Devki Kumari", "Rani Devi",
    "Suman Devi", "Neelam Kumari", "Chanderwati Devi", "Manorama Devi", "Binda Devi",
    "Rajpati Devi", "Savitri Kumari", "Kamlesh Devi", "Gulabi Devi", "Ram rati Devi",
    "Jhagru Devi", "Sugiya Devi", "Girija Devi", "Brijlata Devi", "Nandrani Devi",

    // 101-125
    "Dhanraji Devi", "Rambha Devi", "Vidyawati Kumari", "Kalyani Devi", "Mina Devi",
    "Basheera Devi", "Anandi Devi", "Sumitra Devi", "Shanti Sharma", "Gita Kumari",
    "Sarda Devi", "Phool Kumari", "Ramkuwari Devi", "Kaushilya Kumari", "Sudama Devi",
    "Vimala Devi", "Mateshwari Devi", "Pari Devi", "Parwati Kumari", "Muni Devi",
    "Kushma Devi", "Rajwanti Devi", "Satya Devi", "Sulochana Kumari", "Maina Devi",

    // 126-150
    "Subhavati Devi", "Nirupa Devi", "Shyama Devi", "Kamlesh Kumari", "Shobhawati Devi",
    "Taramati Devi", "Dulari Devi", "Jagatpati Devi", "Fulwa Kumari", "Kishori Devi",
    "Ahilya Devi", "Sampati Devi", "Maheshwari Devi", "Durgawati Kumari", "Leela Devi",
    "Muniya Devi", "Pyari Devi", "Manrakhan Devi", "Ramdulari Kumari", "Phoolan Devi",
    "Nageshwari Devi", "Sunaina Devi", "Bindeshwari Devi", "Rajrani Kumari", "Gangi Devi",

    // 151-175
    "Chhoti Devi", "Fulmati Kumari", "Devanti Devi", "Shivkumari Devi", "Basumati Devi",
    "Radhika Devi", "Rukhmani Devi", "Kamla Kumari", "Shrimati Devi", "Kalwa Devi",
    "Lachhminia Devi", "Shriwanti Devi", "Bhagmania Devi", "Mateshwari Kumari", "Sonmani Devi",
    "Sonam Kumari", "Janakdulari Devi", "Bachi Kumari", "Maharani Devi", "Phoolwa Kumari",
    "Reshma Devi", "Guddi Devi", "Vidyanti Kumari", "Vidyawati Devi", "Sudha Devi",

    // 176-200
    "Devki Devi", "Bhagwati Kumari", "Ramkali Devi", "Chhoto Devi", "Rajmati Devi",
    "Suryanti Devi", "Ramdevi Kumari", "Champa Kumari", "Nirmala Sharma", "Vimla Kumari",
    "Nirbhay Devi", "Manju Kumari", "Sunita Sharma", "Sangita Devi", "Bachhi Kumari",
    "Lilawati Kumari", "Prabhawati Kumari", "Suman Kumari", "Rekha Sharma", "Geeta Devi",
    "Kamlawati Devi", "Shakuntala Devi", "Pushpa Devi", "Sarita Kumari", "Usha Sharma"
];

const PHONE_PREFIXES = [
    "9482", "8315", "7924", "9510", "9371", "8492", "7103", "8258", "9814", "7632",
    "8051", "7947", "9236", "7415", "8820", "9179", "9508", "8374", "7092", "8641",
    "9143", "8726", "7591", "7304", "9965", "8219", "7830", "9482", "9037", "8561",
    "7249", "7715", "9683", "8104", "7492", "8038", "9421", "8873", "7750", "9592",
    "9284", "8361", "7196", "7920", "9753", "8042", "7619", "9385", "9018", "8524",
    "7301", "7847", "9532", "8190", "7963", "8214", "9186", "8759", "7402", "7680",
    "9874", "8243", "7158", "8091", "9320", "8915", "7564", "7437", "9092", "8380",
    "7286", "7793", "9615", "8024", "7849", "8127", "9491", "8637", "7018", "9542",
    "9205", "8172", "7369", "7984", "9710", "8503", "7694", "7321", "9059", "8427",
    "7138", "7802", "9581", "8296", "7470", "8054", "9124", "8763", "7915", "7619",
    "9830", "8154", "7209", "7491", "9362", "8904", "7527", "7183", "9041", "8329",
    "7680", "7742", "9645", "8091", "7314", "9508", "9473", "8619", "7982", "8237",
    "9291", "8450", "7124", "7973", "9780", "8136", "7504", "7392", "9107", "8824",
    "7381", "7695", "9514", "8279", "7042", "8018", "9342", "8701", "7865", "7419",
    "9924", "8591", "7216", "7834", "9603", "8182", "7430", "9571", "9082", "8305",
    "7719", "8294", "9450", "8936", "7192", "7704", "9721", "8064", "7583", "7351",
    "9193", "8472", "7260", "7918", "9590", "8207", "7643", "7109", "9312", "8854",
    "7421", "7673", "9804", "8539", "7086", "7420", "9273", "8165", "7890", "8031",
    "9541", "8792", "7354", "7821", "9694", "8236", "7115", "9560", "9012", "8347",
    "7603", "7781", "9439", "8082", "7519", "8204", "9218", "8693", "7340", "7952"
];

/**
 * Randomly picks a prefix from the array using crypto, 
 * generates the remaining 6 digits cryptographically, and returns a 10-digit phone number.
 */
function generateSecureRandomPhoneNumber() {
    // 1. Pick a random prefix securely from the array
    const prefixIndex = crypto.randomInt(0, PHONE_PREFIXES.length);
    const prefix = PHONE_PREFIXES[prefixIndex];

    // 2. Generate the remaining 6 digits securely, ensuring leading zeros are preserved if rolled
    let remainingDigits = '';
    for (let i = 0; i < 6; i++) {
        remainingDigits += crypto.randomInt(0, 10);
    }

    return prefix + remainingDigits;
}

const EARLY_DETECTION_B1_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_shortness_breath",
    "org.cphc.ncd.anm:id/radioGroup_coughing",
    "org.cphc.ncd.anm:id/radioGroup_blood_sputum",
    "org.cphc.ncd.anm:id/radioGroup_fever_week",
    "org.cphc.ncd.anm:id/radioGroup_weight_loss",
    "org.cphc.ncd.anm:id/radioGroup_night_sweats",
    "org.cphc.ncd.anm:id/radioGroup_anti_TB",
    "org.cphc.ncd.anm:id/radioGroup_suffering_from_TB",
    "org.cphc.ncd.anm:id/radioGroup_history_TB",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_ulceration",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_tingling",
    "org.cphc.ncd.anm:id/radioGroup_blurred_vision",
    "org.cphc.ncd.anm:id/radioGroup_reading_difficulty",
    "org.cphc.ncd.anm:id/radioGroup_pain_in_eye",
    "org.cphc.ncd.anm:id/radioGroup_redness_in_eye",
    "org.cphc.ncd.anm:id/radioGroup_difficulty_hearing",
    "org.cphc.ncd.anm:id/radioGroup_history_fits",
    "org.cphc.ncd.anm:id/radioGroup_difficulty_in_opening_mouth",
    "org.cphc.ncd.anm:id/radioGroup_ulcer_in_mouth",
    "org.cphc.ncd.anm:id/radioGroup_growth_in_mouth",
    "org.cphc.ncd.anm:id/radioGroup_white_red_patch_mouth",
    "org.cphc.ncd.anm:id/radioGroup_pain_while_chewing",
    "org.cphc.ncd.anm:id/radioGroup_voice_tone_change",
    "org.cphc.ncd.anm:id/radioGroup_hypo_pigmented_patch",
    "org.cphc.ncd.anm:id/radioGroup_thickened_skin",
    "org.cphc.ncd.anm:id/radioGroup_noduless_skin",
    "org.cphc.ncd.anm:id/radioGroup_recurrent_numbness_palm",
    "org.cphc.ncd.anm:id/radioGroup_clawing_finger",
    "org.cphc.ncd.anm:id/radioGroup_tingling_numbness",
    "org.cphc.ncd.anm:id/radioGroup_inability_eyelid",
    "org.cphc.ncd.anm:id/radioGroup_difficult_holding_object",
    "org.cphc.ncd.anm:id/radioGroup_difficult_walking"
];

const EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_menopause",
    "org.cphc.ncd.anm:id/radioGroup_stained_discharge",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_after_intercourse",
    "org.cphc.ncd.anm:id/radioGroup_shape_size_breast",
    "org.cphc.ncd.anm:id/radioGroup_foul_smelling_discharge",
    "org.cphc.ncd.anm:id/radioGroup_bleeding_between_period"
];

const FUEL_OPTIONS_TO_SELECT = ["Firewood", "LPG"];

const COPD_OCCUPATIONAL_RADIO_GROUPS = [
    "org.cphc.ncd.anm:id/radioGroup_crop_residue_burning",
    "org.cphc.ncd.anm:id/radioGroup_burning_garbage",
    "org.cphc.ncd.anm:id/radioGroup_working_industry"
];

const PERSONAL_HISTORY_NO_RADIOS = [
    "org.cphc.ncd.anm:id/hypertension_no",
    "org.cphc.ncd.anm:id/diabeties_no",
    "org.cphc.ncd.anm:id/heart_disease_no",
    "org.cphc.ncd.anm:id/stroke_no",
    "org.cphc.ncd.anm:id/kidney_failure_no",
    "org.cphc.ncd.anm:id/nonhealing_wound_no",
    "org.cphc.ncd.anm:id/copd_no",
    "org.cphc.ncd.anm:id/asthma_no",
    "org.cphc.ncd.anm:id/oral_cancer_no",
    "org.cphc.ncd.anm:id/other_no"
];

const ORAL_EXAM_NO_RADIOS = [
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_white_no",
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_patch_red_no",
    "org.cphc.ncd.anm:id/radiobutton_oral_exam_ulcer_no",
    "org.cphc.ncd.anm:id/radiogroup_oral_exam_growth_no",
    "org.cphc.ncd.anm:id/radiogroup_oral_exam_lockedjaw_no"
];

// ============================================================================
// UTILITY & SECURE RANDOM HELPERS
// ============================================================================

function getRandomItem(arr) {
    const randomIndex = crypto.randomInt(0, arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return crypto.randomInt(min, max + 1);
}

function generateRandomDOB() {
    const currentYear = new Date().getFullYear();
    const randomAge = getRandomInt(30, 50); // Age 30–50 range[cite: 3]
    const birthYear = currentYear - randomAge;
    const randomMonth = String(getRandomInt(1, 12)).padStart(2, '0');
    const randomDay = String(getRandomInt(1, 28)).padStart(2, '0');

    return {
        formattedDOB: `${randomDay}-${randomMonth}-${birthYear}`,
        age: randomAge
    };
}



/**
 * Universal Date Selector: Selects GLOBAL_CUSTOM_DATE via keyboard mode if specified,
 * otherwise confirms the current date instantly.
 */

// async function selectConfiguredDate(driver, dateFieldResourceId) {
//     const dateField = await scrollToId(driver, dateFieldResourceId);
//     await dateField.click();
//     await driver.pause(500);

//     // 1. Ensure the Date Picker dialog opens successfully
//     const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
//     let datePickerOpened = false;

//     for (let attempt = 1; attempt <= 3; attempt++) {
//         try {
//             if (await okButton.waitForDisplayed({ timeout: 2000 })) {
//                 datePickerOpened = true;
//                 break;
//             }
//         } catch (e) {
//             await dateField.click();
//             await driver.pause(800);
//         }
//     }

//     if (!datePickerOpened) {
//         throw new Error(`Failed to open date picker dialog for field: ${dateFieldResourceId}`);
//     }

//     // 2. If a custom date string is provided, try selecting the exact day/year view if rendered as text elements
//     if (GLOBAL_CUSTOM_DATE) {
//         try {
//             const [targetDay, targetMonthNum, targetYear] = GLOBAL_CUSTOM_DATE.split('/');
            
//             // Attempt to click the specific target day text directly if visible on screen
//             const dayCell = await driver.$(`android=new UiSelector().text("${parseInt(targetDay, 10)}")`);
//             if (await dayCell.isDisplayed().catch(() => false)) {
//                 await dayCell.click();
//             }
//         } catch (e) {
//             // If wheel view doesn't expose flat text cells, it gracefully proceeds to confirm
//         }
//     }

//     // 3. Confirm selection immediately
//     await okButton.waitForDisplayed({ timeout: 3000 });
//     await okButton.click();
//     await driver.pause(400); // Let picker close cleanly
// }

async function selectConfiguredDate(driver, dateFieldResourceId) {
    const dateField = await scrollToId(driver, dateFieldResourceId);
    await dateField.click();
    await driver.pause(500);

    // 1. Ensure the Date Picker dialog opens successfully
    const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    let datePickerOpened = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            if (await okButton.waitForDisplayed({ timeout: 3000 })) {
                datePickerOpened = true;
                break;
            }
        } catch (e) {
            await dateField.click();
            await driver.pause(800);
        }
    }

    if (!datePickerOpened) {
        throw new Error(`Failed to open date picker dialog for field: ${dateFieldResourceId}`);
    }

    // 2. If a custom date is provided, independently adjust both Month and Date wheels
    if (GLOBAL_CUSTOM_DATE) {
        try {
            const [targetDayStr, targetMonthNumStr, targetYearStr] = GLOBAL_CUSTOM_DATE.split('/');
            const targetDay = parseInt(targetDayStr, 10);
            const targetMonth = parseInt(targetMonthNumStr, 10); // e.g., 9 for September

            const today = new Date();
            const currentMonth = today.getMonth() + 1; // 1-12
            const currentDay = today.getDate();

            // Find all NumberPicker columns (0 = Month, 1 = Date/Day, 2 = Year)
            const pickers = await driver.$$('android=new UiSelector().className("android.widget.NumberPicker")');
            
            if (pickers.length >= 2) {
                // --- A. ADJUST MONTH COLUMN (Index 0) ---
                const monthPicker = pickers[0];
                const mLoc = await monthPicker.getLocation();
                const mSize = await monthPicker.getSize();
                
                const monthCenterX = Math.floor(mLoc.x + mSize.width / 2);
                // Calculate month difference
                const monthDiff = targetMonth - currentMonth;
                
                if (monthDiff !== 0) {
                    // Top edge tap decrements month (past), bottom edge increments (future)
                    const monthTargetY = monthDiff < 0 
                        ? Math.floor(mLoc.y + mSize.height * 0.25) 
                        : Math.floor(mLoc.y + mSize.height * 0.75);

                    const monthSteps = Math.min(Math.abs(monthDiff), 12);
                    for (let m = 0; m < monthSteps; m++) {
                        await driver.execute('mobile: clickGesture', { x: monthCenterX, y: monthTargetY });
                        await driver.pause(120);
                    }
                }

                // --- B. ADJUST DATE COLUMN (Index 1) ---
                const datePicker = pickers[1];
                const dLoc = await datePicker.getLocation();
                const dSize = await datePicker.getSize();
                
                const dateCenterX = Math.floor(dLoc.x + dSize.width / 2);
                // If months were changed, we compare against targetDay directly; otherwise use day difference
                const dayDiff = monthDiff !== 0 ? (targetDay - currentDay) : (targetDay - currentDay);

                if (dayDiff !== 0) {
                    const dateTargetY = dayDiff < 0 
                        ? Math.floor(dLoc.y + dSize.height * 0.25) 
                        : Math.floor(dLoc.y + dSize.height * 0.75);

                    const daySteps = Math.min(Math.abs(dayDiff), 31);
                    for (let d = 0; d < daySteps; d++) {
                        await driver.execute('mobile: clickGesture', { x: dateCenterX, y: dateTargetY });
                        await driver.pause(120);
                    }
                }
            }
        } catch (e) {
            console.warn(`⚠️ Custom date wheel synchronization encountered an issue, proceeding with default view.`);
        }
    }

    // 3. Confirm selection
    await okButton.waitForDisplayed({ timeout: 3000 });
    await okButton.click();
    await driver.pause(400); // Let picker close cleanly
}

// Global cache for screen dimensions to avoid redundant API calls
let cachedWindowRect = null;

/**
 * Performs an ultra-fast, cached downward swipe without resetting the page to the top.
 */
async function swipeDown(driver) {
    // Fetch window rect only once and cache it
    if (!cachedWindowRect) {
        cachedWindowRect = await driver.getWindowRect();
    }
    const { width, height } = cachedWindowRect;

    await driver.execute('mobile: scrollGesture', {
        left: Math.floor(width * 0.1),
        top: Math.floor(height * 0.25),
        width: Math.floor(width * 0.8),
        height: Math.floor(height * 0.6),
        direction: 'down',
        percent: 0.50,
        speed: 8000 // Increased speed parameter for faster swipe animation
    });
    
    // Stripped out the 30ms pause to let execution fire immediately
}

/**
 * Smart Locator: Checks if the element is already displayed. 
 * If not, swipes down incrementally from the *current* position instead of jumping to top.
 */
async function scrollToId(driver, resourceId, maxSwipes = 10) {
    const selector = `android=new UiSelector().resourceId("${resourceId}")`;
    
    for (let i = 0; i < maxSwipes; i++) {
        try {
            const el = await driver.$(selector);
            if (await el.isDisplayed()) {
                return el;
            }
        } catch (e) {
            // Element not found on current screen view, swipe down
        }
        await swipeDown(driver);
    }
    
    // Final fallback attempt
    return await driver.$(selector);
}

/**
 * Smart Text Locator: Incremental scroll matching visible text container.
 */
async function scrollToTextContains(driver, text, maxSwipes = 10) {
    const selector = `android=new UiSelector().textContains("${text}")`;
    
    for (let i = 0; i < maxSwipes; i++) {
        try {
            const el = await driver.$(selector);
            if (await el.isDisplayed()) {
                return el;
            }
        } catch (e) {}
        await swipeDown(driver);
    }
    return await driver.$(selector);
}


async function expandAccordionAndWaitForChild(driver, expandableId, expectedChildId) {
    const coverSelector =
        `android=new UiSelector().resourceId("${expandableId}")` +
        `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/cover"))`;

    const coverEl = await scrollToId(driver, expandableId);
    const coverChild = await driver.$(coverSelector);
    await coverChild.click();
    
    // Brief pause for accordion layout expansion animation to finish smoothly
    await driver.pause(400); 

    const childEl = await scrollToId(driver, expectedChildId);
    await childEl.waitForDisplayed({ timeout: 3000 });
}

// // ============================================================================
// // ULTRA-FAST RADIO SELECTOR (REDUCES DELAY TO < 0.5s PER ITEM)
// // ============================================================================
// async function selectSecondRadioInGroup(driver, radioGroupId) {
//     const noRadioSelector =
//         `android=new UiSelector().resourceId("${radioGroupId}")` +
//         `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

//     try {
//         const radioEl = await driver.$(noRadioSelector);

//         // Fast path visibility check
//         if (!(await radioEl.isDisplayed().catch(() => false))) {
//             await scrollToId(driver, radioGroupId);
//         }

//         // Direct click without slow attribute queries to maximize speed
//         await radioEl.click();
//     } catch (error) {
//         // Fallback retry if a minor frame shift occurs
//         await scrollToId(driver, radioGroupId);
//         const fallbackEl = await driver.$(noRadioSelector);
//         await fallbackEl.click();
//     }
// }


// ============================================================================
// STABILIZED ULTRA-FAST RADIO SELECTOR (WITH STATE VERIFICATION & RETRY)
// ============================================================================
// async function selectSecondRadioInGroup(driver, radioGroupId) {
//     const noRadioSelector =
//         `android=new UiSelector().resourceId("${radioGroupId}")` +
//         `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

//     const maxRetries = 3;

//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//         try {
//             let radioEl = await driver.$(noRadioSelector);

//             // Ensure the element is visible on screen
//             if (!(await radioEl.isDisplayed().catch(() => false))) {
//                 await scrollToId(driver, radioGroupId);
//                 radioEl = await driver.$(noRadioSelector);
//             }

//             // Click the radio button
//             await radioEl.click();
//             await driver.pause(150); // Minimal pause for UI state update

//             // Verify if Android registered the selection
//             const isChecked = await radioEl.getAttribute("checked");
//             if (isChecked === "true" || isChecked === true) {
//                 return; // Success! Exit immediately at high speed
//             }
//         } catch (error) {
//             // Minor frame shift or layout stutter, handle fallback on final attempt or continue retry
//         }

//         // If check failed or threw an error, scroll back and try clicking again
//         try {
//             await scrollToId(driver, radioGroupId);
//             const retryEl = await driver.$(noRadioSelector);
//             await retryEl.click();
//             await driver.pause(200);

//             const retryCheck = await retryEl.getAttribute("checked");
//             if (retryCheck === "true" || retryCheck === true) {
//                 return;
//             }
//         } catch (err) {}
//     }

//     throw new Error(`CRITICAL: Failed to verify selection for radio group "${radioGroupId}" after ${maxRetries} attempts.`);
// }

// ============================================================================
// STABILIZED & CRASH-PROOF RADIO SELECTOR
// ============================================================================
async function selectSecondRadioInGroup(driver, radioGroupId) {
    const noRadioSelector =
        `android=new UiSelector().resourceId("${radioGroupId}")` +
        `.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))`;

    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            let radioEl = await driver.$(noRadioSelector);

            // 1. Ensure the element is visible on screen
            if (!(await radioEl.isDisplayed().catch(() => false))) {
                await scrollToId(driver, radioGroupId);
                radioEl = await driver.$(noRadioSelector);
            }

            // 2. Get precise coordinates and perform a high-speed click gesture
            const location = await radioEl.getLocation();
            const size = await radioEl.getSize();
            
            const centerX = Math.floor(location.x + size.width / 2);
            const centerY = Math.floor(location.y + size.height / 2);

            await driver.execute('mobile: clickGesture', {
                x: centerX,
                y: centerY
            });

            await driver.pause(150); // Minimal pause for UI state update
            return; // Success! Exit immediately without false attribute errors

        } catch (error) {
            // If an error occurs on this attempt, pause briefly and retry
            await driver.pause(250);
            
            if (attempt === maxRetries) {
                console.warn(`⚠️ Warning: Radio group ${radioGroupId} experienced layout lag, performing forced scroll recovery.`);
                await scrollToId(driver, radioGroupId);
            }
        }
    }
}

async function selectSpinnerOption(driver, spinnerResourceId, primaryText, fallbackText = null) {
    const spinner = await scrollToId(driver, spinnerResourceId);
    await spinner.click();

    const dropdownList = await driver.$('android=new UiSelector().className("android.widget.ListView")');
    await dropdownList.waitForDisplayed({ timeout: 3000 });

    let option = await driver.$(
        `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${primaryText}")`
    );

    if (!(await option.isDisplayed().catch(() => false)) && fallbackText) {
        option = await driver.$(
            `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/text_tv").text("${fallbackText}")`
        );
    }

    await option.waitForDisplayed({ timeout: 3000 });
    await option.click();
    
    // CRITICAL: Let the app process the selection choice and close the list view completely
    await driver.pause(500); 
}

async function selectCustomMultiSpinnerOptions(driver, spinnerResourceId, optionsList) {
    // 1. Locate and click spinner immediately without pre-reading text
    const spinner = await scrollToId(driver, spinnerResourceId);
    await spinner.click();

    // 2. Wait briefly for the modal OK button to appear
    const okButton = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/mulit_spinner_ok")'
    );
    await okButton.waitForDisplayed({ timeout: 3000 });

    // 3. Direct click on target checkboxes, bypassing slow attribute checks
    for (const optionText of optionsList) {
        const checkbox = await driver.$(
            `android=new UiSelector().resourceId("org.cphc.ncd.anm:id/multi_spinner_list")` +
            `.childSelector(new UiSelector().className("android.widget.LinearLayout")` +
            `.childSelector(new UiSelector().resourceId("org.cphc.ncd.anm:id/spinner_textview").text("${optionText}"))` +
            `.fromParent(new UiSelector().resourceId("org.cphc.ncd.anm:id/checkbox1")))`
        );
        await checkbox.click();
    }

    // 4. Submit and exit immediately without heavy reverse-wait polling
    await okButton.click();
}


/**
 * Instantly checks for and clears the NCD risk alert popup if it appears, 
 * without throwing errors or slowing down the script if it isn't present.
 */
async function dismissRiskAlertPopupIfNeeded(driver) {
    try {
        const okAlertButton = await driver.$(
            'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/button_cphm_gen_message")'
        );
        // Quick check if displayed with a very short timeout (0.2s) to avoid lag
        if (await okAlertButton.isDisplayed().catch(() => false)) {
            await okAlertButton.click();
        }
    } catch (e) {
        // Silently ignore if the popup didn't appear
    }
}
// ============================================================================
// SECTION 0: INDIVIDUAL ENROLLMENT (BULLETPROOF DATE PICKER)
// ============================================================================
async function fillIndividualEnrollment(driver) {
    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/edit_text_enrollment_form_date");
    await driver.pause(300);

    const villageSpinner = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_family_village");
    await villageSpinner.click();

    const villageOption = await scrollToTextContains(driver, "Sohijan Dih");
    await villageOption.click();

    const isMale = true;
    const selectedName = isMale ? getRandomItem(MALE_NAMES) : getRandomItem(FEMALE_NAMES);

    const nameInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_name");
    await nameInput.setValue(selectedName);

    const genderRadioId = isMale
        ? "org.cphc.ncd.anm:id/enrolment_gender_male"
        : "org.cphc.ncd.anm:id/enrolment_gender_female";
    const genderRadio = await scrollToId(driver, genderRadioId);
    await genderRadio.click();

    const { formattedDOB, age } = generateRandomDOB();
    const dobInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_dob");
    await dobInput.click();
    await dobInput.setValue(formattedDOB);

    const ageInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_approx_age");
    await ageInput.setValue(String(age));

    const selectedMobile = generateSecureRandomPhoneNumber();
    const mobileInput = await scrollToId(driver, "org.cphc.ncd.anm:id/enrollment_individual_mobile_number");
    await mobileInput.setValue(selectedMobile);

    try {
        await driver.hideKeyboard();
    } catch (e) {}

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/image_button_quick_enrolment_save");
    await saveButton.click();

    const successOkButton = await driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
    try {
        await successOkButton.waitForDisplayed({ timeout: 5000 });
        await successOkButton.click();
    } catch (e) {}

    // console.log("=== [Section 0] Individual Enrollment Completed ===\n");
    return { isMale };
}

// ============================================================================
// SECTION 1: CBAC PART A - RISK ASSESSMENT
// ============================================================================
async function fillCbacPartA(driver, isMale = false) {
    // CRITICAL BREATHER: Give the app time to transition from the Enrollment save screen 
    // to the main Screening Dashboard and finish rendering the dashboard tiles.
    await driver.pause(1500);

    // Locate and click CBAC tile container with explicit wait
    const cbacTileContainer = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/relativelayout_general_registraion"
    );
    await cbacTileContainer.waitForDisplayed({ timeout: 8000 });
    await cbacTileContainer.click();
    
    // Brief breather for the CBAC entry form screen to load
    await driver.pause(800);

    // =========================================================================
    // PAST DATE SELECTION (Pass daysAgo count like 2, or a custom string "DD/MM/YYYY")
    // =========================================================================
    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/edit_text_cbac_entry_date");
    await driver.pause(300);

    await selectCustomMultiSpinnerOptions(
        driver,
        "org.cphc.ncd.anm:id/spinner_does_this_person_have",
        ["None"]
    );
    
    // Check popup immediately after medical history multi-spinner
    await dismissRiskAlertPopupIfNeeded(driver);

    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_risk_assessment",
        "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type"
    );

    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_smoke_khaini_question_type",
        "Never"
    );

    const alcoholNoRadio = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/radio_button_consume_alcohol_daily_no"
    );

    if ((await alcoholNoRadio.getAttribute('checked')) !== 'true') {
        await alcoholNoRadio.click();
    }
    
    // Check popup after alcohol response
    await dismissRiskAlertPopupIfNeeded(driver);

    const primaryWaist = isMale ? "91-100 cm" : "81-90 cm";
    const fallbackWaist = isMale ? "81-90 cm" : "91-100 cm";
    await selectSpinnerOption(
        driver,
        "org.cphc.ncd.anm:id/spinner_waist_measurement_type",
        primaryWaist,
        fallbackWaist
    );

    const physicalActivityLessRadio = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/radio_button_less_than_150_physical_activity"
    );
    if ((await physicalActivityLessRadio.getAttribute('checked')) !== 'true') {
        await physicalActivityLessRadio.click();
    }
    
    // Check popup after physical activity scoring input
    await dismissRiskAlertPopupIfNeeded(driver);

    const familyBpNoRadio = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/radio_button_family_history_blood_pressure_no"
    );
    if ((await familyBpNoRadio.getAttribute('checked')) !== 'true') {
        await familyBpNoRadio.click();
    }
    
    // Final check for Part A completion boundary
    await dismissRiskAlertPopupIfNeeded(driver);
}


// ============================================================================
// STABILIZED SECTION 2: CBAC PART B - EARLY DETECTION
// ============================================================================
async function fillCbacPartB(driver) {
    // console.log("=== [Part B] Starting CBAC: Early Detection ===");

    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_early_detection",
        "org.cphc.ncd.anm:id/text_view_early_detection_sub_title"
    );

    // 1. Loop through all B1 radio groups with built-in retry safety
    for (const groupId of EARLY_DETECTION_B1_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
    }
    // console.log("Part B1 (Women and Men) questions completed!");

    // 2. B2: Women Only Section
    const firstWomensRadioSelector =
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast")' +
        '.childSelector(new UiSelector().className("android.widget.RadioButton").instance(1))';

    try {
        await scrollToId(driver, "org.cphc.ncd.anm:id/radioGroup_suffering_lump_breast");
        const radioEl = await driver.$(firstWomensRadioSelector);

        if (await radioEl.isEnabled().catch(() => false)) {
            // console.log("B2: Women-only radio buttons enabled — processing...");
            if ((await radioEl.getAttribute('checked')) !== 'true') {
                await radioEl.click();
            }
            await driver.pause(150);

            for (let i = 1; i < EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS.length; i++) {
                await selectSecondRadioInGroup(driver, EARLY_DETECTION_WOMENS_ONLY_RADIO_GROUPS[i]);
            }
            // console.log("B2: Women-only questions completed!");
        } else {
            console.log("B2: Women-only radio buttons disabled (Male patient) — skipping.");
        }
    } catch (e) {
        console.log("B2 section check skipped or not applicable.");
    }

    // console.log("=== [Part B] CBAC Early Detection Completed ===\n");
}

// ============================================================================
// SECTION 3: CBAC PART C - RISK FACTORS FOR COPD
// ============================================================================
async function fillCbacPartC(driver) {
    // console.log("=== [Part C] Starting CBAC: Risk Factors for COPD ===");

    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_risk_factor",
        "org.cphc.ncd.anm:id/multi_spinner_fuel_type"
    );

    await selectCustomMultiSpinnerOptions(
        driver,
        "org.cphc.ncd.anm:id/multi_spinner_fuel_type",
        FUEL_OPTIONS_TO_SELECT,
        "Firewood, LPG"
    );

    for (const groupId of COPD_OCCUPATIONAL_RADIO_GROUPS) {
        await selectSecondRadioInGroup(driver, groupId);
    }

    // console.log("=== [Part C] CBAC Risk Factors for COPD Completed ===\n");
}

// ============================================================================
// SECTION 4: CBAC PART D - PHQ 2 & FINISH (STABILIZED)
// ============================================================================
async function fillCbacPartD(driver) {
    console.log("=== [Part D] Starting CBAC: PHQ 2 ===");

    // 1. Expand Part D Accordion and wait for first dropdown to be ready
    await expandAccordionAndWaitForChild(
        driver,
        "org.cphc.ncd.anm:id/expandable_phq",
        "org.cphc.ncd.anm:id/spinner_little_interest_name"
    );

    // 2. First PHQ-2 Dropdown -> "Not at all"
    // console.log("Selecting first PHQ-2 dropdown option...");
    await selectSpinnerOption(driver, "org.cphc.ncd.anm:id/spinner_little_interest_name", "Not at all");
    
    // CRITICAL STABILIZATION PAUSE: Let the UI layout settle completely after 1st dropdown closes
    await driver.pause(800);

    // 3. Second PHQ-2 Dropdown -> "Not at all" (safely scrolled and verified)
    // console.log("Selecting second PHQ-2 dropdown option...");
    await selectSpinnerOption(driver, "org.cphc.ncd.anm:id/spinner_feeling_down_name", "Not at all");
    
    // Brief pause before hitting finish
    await driver.pause(500);

    // 4. Scroll down to FINISH button and submit CBAC
    const finishButton = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/button_finish"
    );
    await finishButton.click();

    const confirmYesButton = await driver.$(
        'android=new UiSelector().resourceId("android:id/button1").text("YES")'
    );
    await confirmYesButton.waitForDisplayed({ timeout: 3000 });
    await confirmYesButton.click();
    // console.log("=== [Part D] CBAC Submitted & Confirmed (YES) ===\n");
}

// ============================================================================
// SECTION 5: PERSONAL EXAMINATION (Height 150-200cm + Healthy BMI Weight)
// ============================================================================
async function fillPersonalExamination(driver, isMale = false) {
    // console.log("=== [Section 5] Starting Personal Examination ===");

    const personalExamTile = await driver.$(
        'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/relative_layout_personal_examination")'
    );
    await personalExamTile.waitForDisplayed({ timeout: 4000 });
    await personalExamTile.click();

    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/personal_examination_visit_date_input");
    await driver.pause(300);

    // Height: 150 to 200 cm range[cite: 3]
    const heightValue = getRandomInt(150, 200);
    const heightInput = await scrollToId(driver, "org.cphc.ncd.anm:id/height_input");
    await heightInput.clearValue();
    await heightInput.setValue(String(heightValue));

    // Weight: Calculated dynamically to maintain a healthy BMI range (20.0 to 24.0)[cite: 3]
    const heightInMeters = heightValue / 100;
    const targetBmi = getRandomInt(200, 240) / 10; 
    const weightValue = Math.round(targetBmi * (heightInMeters * heightInMeters));
    
    const weightInput = await scrollToId(driver, "org.cphc.ncd.anm:id/weight_input");
    await weightInput.clearValue();
    await weightInput.setValue(String(weightValue));

    try { await driver.hideKeyboard(); } catch (e) {}

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/personal_examination_save");
    await saveButton.click();

    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 3000 }).catch(() => false)) {
        await postSaveOk.click();
    }
    // console.log("=== [Section 5] Personal Examination Completed ===\n");
}

// ============================================================================
// SECTION 6: PERSONAL HISTORY
// ============================================================================
async function fillPersonalHistory(driver) {
    // console.log("=== [Section 6] Starting Personal History ===");

    const personalHistoryTile = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/personal_history_registration"
    );
    await personalHistoryTile.click();

    for (const noRadioId of PERSONAL_HISTORY_NO_RADIOS) {
        const noRadio = await scrollToId(driver, noRadioId);
        if ((await noRadio.getAttribute('checked')) !== 'true') {
            await noRadio.click();
        }
    }

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/personal_history_save");
    await saveButton.click();

    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2000 }).catch(() => false)) {
        await postSaveOk.click();
    }
    console.log("=== [Section 6] Personal History Completed ===\n");
}

// ============================================================================
// SECTION 7: HYPERTENSION SCREENING
// ============================================================================
async function fillHypertensionScreening(driver) {
    console.log("=== [Section 7] Starting Hypertension Screening ===");

    const hypertensionTile = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/relativelayout_hyper_tension"
    );
    await hypertensionTile.click();
    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/hypertension_date_value");
    await driver.pause(300);

    const systolicValue = getRandomInt(100, 120);
    const systolicInput = await scrollToId(driver, "org.cphc.ncd.anm:id/hypertension_systolic_value");
    await systolicInput.clearValue();
    await systolicInput.setValue(String(systolicValue));

    const diastolicValue = getRandomInt(70, 80);
    const diastolicInput = await scrollToId(driver, "org.cphc.ncd.anm:id/hypertension_diastolic_value");
    await diastolicInput.clearValue();
    await diastolicInput.setValue(String(diastolicValue));

    try { await driver.hideKeyboard(); } catch (e) {}

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/hypertension_save");
    await saveButton.click();

    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2000 }).catch(() => false)) {
        await postSaveOk.click();
    }
    // console.log("=== [Section 7] Hypertension Screening Completed ===\n");
}

// ============================================================================
// SECTION 8: DIABETES SCREENING
// ============================================================================
async function fillDiabetesScreening(driver) {
    // console.log("=== [Section 8] Starting Diabetes Screening ===");

    const diabetesTile = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/relativelayout_diabetes"
    );
    await diabetesTile.click();

    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/diabetes_date_value");
    await driver.pause(300);

    const fastingSugarValue = getRandomInt(80, 100);
    const fastingSugarInput = await scrollToId(driver, "org.cphc.ncd.anm:id/diabetes_fasting_sugar_value");
    await fastingSugarInput.clearValue();
    await fastingSugarInput.setValue(String(fastingSugarValue));

    try { await driver.hideKeyboard(); } catch (e) {}

    const saveButton = await scrollToId(driver, "org.cphc.ncd.anm:id/diabetes_save");
    await saveButton.click();

    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2000 }).catch(() => false)) {
        await postSaveOk.click();
    }
    // console.log("=== [Section 8] Diabetes Screening Completed ===\n");
}

// ============================================================================
// SECTION 9: ORAL SCREENING
// ============================================================================
async function fillOralScreening(driver) {
    // console.log("=== [Section 9] Starting Oral Screening ===");

    const oralTile = await scrollToId(
        driver,
        "org.cphc.ncd.anm:id/relativelayout_oral_screening"
    );
    await oralTile.click();

    // const oralVisitDateField = await driver.$(
    //     'android=new UiSelector().resourceId("org.cphc.ncd.anm:id/oral_symptom_visit_date_input")'
    // );
    // await oralVisitDateField.waitForDisplayed({ timeout: 5000 });

    // const { x, y } = await oralVisitDateField.getLocation();
    // const { width, height } = await oralVisitDateField.getSize();
    // await driver.execute('mobile: clickGesture', { x: Math.floor(x + width / 2), y: Math.floor(y + height / 2) });

    // const okButton = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    // if (!(await okButton.waitForDisplayed({ timeout: 1500 }).catch(() => false))) {
    //     await driver.execute('mobile: clickGesture', { x: Math.floor(x + width / 2), y: Math.floor(y + height / 2) });
    //     await okButton.waitForDisplayed({ timeout: 3000 });
    // }
    // await okButton.click();

    await selectConfiguredDate(driver, "org.cphc.ncd.anm:id/oral_symptom_visit_date_input");
    await driver.pause(300);

    const oralSymptomsSaveBtn = await scrollToId(driver, "org.cphc.ncd.anm:id/oral_symptoms_save");
    await oralSymptomsSaveBtn.click();

    for (const noRadioId of ORAL_EXAM_NO_RADIOS) {
        const noRadio = await scrollToId(driver, noRadioId);
        if ((await noRadio.getAttribute('checked')) !== 'true') {
            await noRadio.click();
        }
    }

    const oralExamSaveBtn = await scrollToId(driver, "org.cphc.ncd.anm:id/cancer_oral_exam_save");
    await oralExamSaveBtn.click();

    const oralPhotoSaveBtn = await scrollToId(driver, "org.cphc.ncd.anm:id/cancer_oral_photo_save");
    await oralPhotoSaveBtn.click();

    const referralNoRadio = await scrollToId(driver, "org.cphc.ncd.anm:id/cancer_referral_no");
    if ((await referralNoRadio.getAttribute('checked')) !== 'true') {
        await referralNoRadio.click();
    }

    const referralSaveBtn = await scrollToId(driver, "org.cphc.ncd.anm:id/referral_save");
    await referralSaveBtn.click();

    const postSaveOk = await driver.$('android=new UiSelector().resourceId("android:id/button1")');
    if (await postSaveOk.waitForDisplayed({ timeout: 2000 }).catch(() => false)) {
        await postSaveOk.click();
    }
    // console.log("=== [Section 9] Oral Screening Completed ===\n");
}

// // ============================================================================
// // SECTION 10: EXIT DASHBOARD -> RETURN TO START
// // ============================================================================
// async function exitScreeningDashboard(driver) {
//     // console.log("=== [Section 10] Exiting Screening Dashboard ===");
//     await driver.back();

//     const confirmYesButton = await driver.$(
//         'android=new UiSelector().resourceId("android:id/button1").text("YES")'
//     );
//     await confirmYesButton.waitForDisplayed({ timeout: 3000 });
//     await confirmYesButton.click();
//     // console.log("=== [Section 10] Returned to Initial Screen ===\n");
// }

// ============================================================================
// SECTION 10: EXIT DASHBOARD -> RETURN TO START (FULLY CASE-INSENSITIVE)
// ============================================================================
async function exitScreeningDashboard(driver) {
    // console.log("=== [Section 10] Exiting Screening Dashboard ===");
    await driver.back();

    // Comprehensive selector list covering resource ID and all case variations of "yes"
    const selectors = [
        'android=new UiSelector().resourceId("android:id/button1")',
        'android=new UiSelector().text("YES")',
        'android=new UiSelector().text("Yes")',
        'android=new UiSelector().text("yes")',
        'android=new UiSelector().textContains("YES")',
        'android=new UiSelector().textContains("Yes")'
    ];

    let clicked = false;
    for (const selector of selectors) {
        try {
            const confirmYesButton = await driver.$(selector);
            if (await confirmYesButton.isDisplayed().catch(() => false)) {
                await confirmYesButton.click();
                clicked = true;
                break;
            }
        } catch (e) {
            // Try the next selector variation
        }
    }

    // Ultimate fallback if selectors miss due to custom dialog rendering: coordinate tap
    if (!clicked) {
        try {
            await driver.execute('mobile: clickGesture', { x: 750, y: 1450 });
            clicked = true;
        } catch (err) {
            throw new Error("CRITICAL: Failed to locate and click confirmation button on exit popup.");
        }
    }

    await driver.pause(600); // Allow navigation transition to settle

    // FORCE VIEW TO ABSOLUTE TOP: Fixes the issue where returning to the 
    // initial screen keeps the old scroll offset, hiding the first date field.
    try {
        await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(1)');
        await driver.pause(300);
    } catch (e) {
        // Fallback: If UiScrollable container isn't directly bound, perform a quick upward scroll gesture
        try {
            await driver.execute('mobile: scrollGesture', {
                left: 500, top: 500, width: 200, height: 1000,
                direction: 'up',
                percent: 1.0,
                speed: 3000
            });
        } catch (err) {
            console.warn("⚠️ Scroll-to-top reset skipped.");
        }
    }

    // console.log("=== [Section 10] Returned to Initial Screen and Reset to Top ===\n");
}

// ============================================================================
// SINGLE ENTRY WORKFLOW
// ============================================================================
async function executeSingleEntryWorkflow(driver) {
    let enrolledGenderIsMale = false;

    if (FLOW_STEPS.runEnrollment) {
        const enrollmentResult = await fillIndividualEnrollment(driver);
        enrolledGenderIsMale = enrollmentResult.isMale;
    }
    if (FLOW_STEPS.runCbacPartA) await fillCbacPartA(driver, enrolledGenderIsMale);
    if (FLOW_STEPS.runCbacPartB) await fillCbacPartB(driver);
    if (FLOW_STEPS.runCbacPartC) await fillCbacPartC(driver);
    if (FLOW_STEPS.runCbacPartD) await fillCbacPartD(driver);
    if (FLOW_STEPS.runPersonalExam) await fillPersonalExamination(driver, enrolledGenderIsMale);
    if (FLOW_STEPS.runPersonalHistory) await fillPersonalHistory(driver);
    if (FLOW_STEPS.runHypertensionScreening) await fillHypertensionScreening(driver);
    if (FLOW_STEPS.runDiabetesScreening) await fillDiabetesScreening(driver);
    if (FLOW_STEPS.runOralScreening) await fillOralScreening(driver);
    if (FLOW_STEPS.runExitAndResetToStart) await exitScreeningDashboard(driver);
}

// ============================================================================
// MASTER LOOP ORCHESTRATOR
// ============================================================================
async function runCompleteAutomationFlow(totalEntries = TOTAL_ENTRIES_TO_RUN) {
    const driver = await remote(opts);
    let completedCount = 0;
    let failedCount = 0;

    for (let entryIndex = 1; entryIndex <= totalEntries; entryIndex++) {
        // console.log(`************************************************************`);
        // console.log(`STARTING ENTRY ${entryIndex} OF ${totalEntries}`);
        // console.log(`************************************************************\n`);

        try {
            await executeSingleEntryWorkflow(driver);
            completedCount++;
            // console.log(`>>> ENTRY ${entryIndex} COMPLETED SUCCESSFULLY! (Total Done: ${completedCount})\n`);
            await driver.pause(1000);
        } catch (error) {
            failedCount++;
            console.error(`❌ Automation flow encountered an error on entry #${entryIndex}:`, error.message);
            
            try {
                // console.log(`Attempting recovery via Back button...`);
                await driver.pressKeyCode(4);
                await driver.pause(1000);
            } catch (recoveryErr) {
                console.error(`Recovery back-press failed:`, recoveryErr.message);
            }
            console.log(`Continuing to next entry... (Failed so far: ${failedCount})\n`);
        }
    }

    // console.log(`============================================================`);
    // console.log(`AUTOMATION FINISHED! Completed: ${completedCount} | Failed: ${failedCount}`);
    // console.log(`============================================================`);

    try {
        await driver.deleteSession();
    } catch (e) {}
}

if (require.main === module) {
    runCompleteAutomationFlow();
}

module.exports = {
    runCompleteAutomationFlow
};