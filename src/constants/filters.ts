// Popular Swedish municipalities and occupation groups for simple filtering
// Based on job data from Arbetsförmedlingen API

export interface FilterItem {
  id: string;
  label: string;
}

// Popular municipalities from job data
export const POPULAR_MUNICIPALITIES: FilterItem[] = [
  { id: "AvNB_uwa_6n6", label: "Stockholm" },
  { id: "PVZL_BQT_XtL", label: "Göteborg" },
  { id: "oYPt_yRA_Smm", label: "Malmö" },
  { id: "otaF_bQY_4ZD", label: "Uppsala" },
  { id: "bm2x_1mr_Qhx", label: "Linköping" },
  { id: "Q7gp_9dT_k2F", label: "Haninge" },
  { id: "AkUx_yAq_kGr", label: "Varberg" },
  { id: "qk8Y_2b6_82D", label: "Gävle" },
  { id: "CSy8_41F_YvX", label: "Trollhättan" },
  { id: "kMxr_NiX_YrU", label: "Eskilstuna" },
  { id: "SYty_Yho_JAF", label: "Norrköping" },
  { id: "nXZy_1Jd_D8X", label: "Lessebo" },
  { id: "yurW_aLE_4ga", label: "Krokom" },
  { id: "mBKv_q3B_SK8", label: "Nykvarn" },
  { id: "Vt7P_856_WZS", label: "Östersund" },
  { id: "QiGt_BLu_amP", label: "Umeå" },
  { id: "oLT3_Q9p_3nn", label: "Växjö" },
  { id: "aKkp_sEX_cVM", label: "Uddevalla" },
  { id: "CaRE_1nn_cSU", label: "Helsingborg" },
  { id: "zdoY_6u5_Krt", label: "Borås" },
];

export const POPULAR_OCCUPATION_GROUPS: FilterItem[] = [
  { id: "2512", label: "Mjukvaru- och systemutvecklare" },
  { id: "2221", label: "Sjuksköterskor" },
  { id: "5311", label: "Förskolelärare" },
  { id: "9112", label: "Städare" },
  { id: "5222", label: "Butiksförsäljare" },
  { id: "8332", label: "Lastbils- / tung trafikförare" },
  { id: "2411", label: "Ekonomer / Redovisningsekonomer" },
  { id: "3511", label: "Systemadministratörer, IT" },
  { id: "3320", label: "Fastighetstekniker / Fastighetsskötare" },
  { id: "3231", label: "Undersköterskor / Vårdbiträden" },
  { id: "2320", label: "Lärare i grundskola" },
  { id: "7211", label: "Målare" },
  { id: "7411", label: "Elektriker" },
  { id: "1330", label: "Verkställande / ekonomiska chefer" },
  { id: "3312", label: "Maskinoperatörer" },
];