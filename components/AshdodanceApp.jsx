"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Heart, Calendar, MapPin, X, Building2, Clock, Share2, Zap, RotateCcw, Pencil, Info } from "lucide-react";

const STORAGE_KEY_SAVED = "ashdodance2026:saved";
const STORAGE_KEY_NOTES = "ashdodance2026:notes";

const EVENTS = [{"id": "d-001", "kind": "dance", "date": "2026-07-27", "start": "20:00", "end": "21:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "עופר אלפסי וגילה בארון", "unc": false, "free": true}, {"id": "d-002", "kind": "dance", "date": "2026-07-27", "start": "21:00", "end": "22:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "שמעון עשור ונושי אליאס", "unc": false, "free": true}, {"id": "d-003", "kind": "dance", "date": "2026-07-27", "start": "22:00", "end": "23:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "אילן סויסה ועופרה יחזקאל", "unc": false, "free": true}, {"id": "d-004", "kind": "dance", "date": "2026-07-27", "start": "23:00", "end": "00:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "ירון אלפסי וגלית שם טוב", "unc": false, "free": true}, {"id": "d-005", "kind": "dance", "date": "2026-07-28", "start": "00:00", "end": "01:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "אלי סגל ועידית שמש", "unc": false, "free": true}, {"id": "d-006", "kind": "dance", "date": "2026-07-28", "start": "01:00", "end": "02:00", "title": "הרקדת פתיחה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדת פתיחה", "staff": "דודו ברזילי וירון בן שמחון", "unc": false, "free": true}, {"id": "d-007", "kind": "dance", "date": "2026-07-28", "start": "11:00", "end": "12:30", "title": "אנחנו פה", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "פתיחה רשמית - מעגלים מכל הזמנים", "staff": "שלומית נגר, אביטל חוברה", "unc": false, "free": true}, {"id": "d-008", "kind": "dance", "date": "2026-07-28", "start": "12:30", "end": "13:30", "title": "קרוסלה", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "הרקדת פתיחה לזוגות", "staff": "עופרה יחזקאל", "unc": false, "free": true}, {"id": "d-009", "kind": "dance", "date": "2026-07-28", "start": "13:30", "end": "15:00", "title": "יום חולין", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "סדנה המוקדשת ליצירותיו של אבי פרץ.", "staff": "יוצר: אבי פרץ; מפיקים: מאור בן עמי, אלמוג בן עמי", "unc": false, "free": true}, {"id": "d-010", "kind": "dance", "date": "2026-07-28", "start": "15:00", "end": "16:00", "title": "צלצולי פעמונים", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הרקדה ליצירות על שירי חיים חפר, יואב יצחק ואייל גולן.", "staff": "דרור ואפרת ורדי", "unc": false, "free": true}, {"id": "d-011", "kind": "dance", "date": "2026-07-28", "start": "16:00", "end": "17:00", "title": "הורה סוערת", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "חגיגת הורות וריקודים קצביים, סוחפים ואנרגטיים.", "staff": "מפיק: יובל טבשי", "unc": false, "free": true}, {"id": "d-012", "kind": "dance", "date": "2026-07-28", "start": "17:00", "end": "18:00", "title": "הפרי שלך", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "הרקדת זוגות בסגנון סטודיו", "staff": "סמדר עשור", "unc": false, "free": true}, {"id": "d-013", "kind": "dance", "date": "2026-07-28", "start": "18:00", "end": "19:30", "title": "קומונע!", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "הרקדת מעגלים הכי צעירה ותוססת בארץ", "staff": "מפיקים: הילה מוקדסי, חיים צרף", "unc": false, "free": true}, {"id": "d-014", "kind": "dance", "date": "2026-07-28", "start": "19:30", "end": "21:00", "title": "אני גיטרה", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "הרקדת זוגות עם יוצר אורח", "staff": "ציון סהר, שלי שקד; יוצר אורח: מרקו בן שמעון", "unc": false, "free": true}, {"id": "d-015", "kind": "dance", "date": "2026-07-28", "start": "21:00", "end": "22:00", "title": "מעגלים וזוגות", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מקצה ערב באולם הקריה.", "staff": "מאור וניסים בן עמי", "unc": false, "free": true}, {"id": "d-016", "kind": "dance", "date": "2026-07-28", "start": "22:00", "end": "23:00", "title": "מעגלים וזוגות", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מקצה ערב באולם הקריה.", "staff": "יובל טבשי", "unc": false, "free": true}, {"id": "d-017", "kind": "dance", "date": "2026-07-28", "start": "23:00", "end": "00:00", "title": "המרתון המרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "איציק בן דהן וניסים חלפון", "unc": false, "free": true}, {"id": "d-018", "kind": "dance", "date": "2026-07-29", "start": "00:00", "end": "01:00", "title": "המרתון המרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "הילה מוקדסי ואלמוג בן עמי", "unc": false, "free": true}, {"id": "d-019", "kind": "dance", "date": "2026-07-29", "start": "01:00", "end": "02:00", "title": "המרתון המרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "חיים מילשטיין וחיים וקנין", "unc": false, "free": true}, {"id": "d-020", "kind": "dance", "date": "2026-07-29", "start": "02:00", "end": "03:00", "title": "המרתון המרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "רחלה אדרי, יוסי מיארה ואיתי בן ארצי", "unc": false, "free": true}, {"id": "d-021", "kind": "dance", "date": "2026-07-28", "start": "10:00", "end": "11:30", "title": "אשדוד הבוקר", "venueId": "cafe-theater-yad-labanim", "cat": "מעגלים", "audience": "הרקדת בוקר", "staff": "ז'ק אוחיון", "unc": false, "free": true}, {"id": "d-022", "kind": "dance", "date": "2026-07-28", "start": "11:30", "end": "12:30", "title": "מה יהיה מחר", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "כללי", "staff": "עופר יהושע, עופר אלפסי", "unc": false, "free": true}, {"id": "d-023", "kind": "dance", "date": "2026-07-28", "start": "12:30", "end": "14:00", "title": "גודצקי צ'אצ'אק", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "הרקדת ריקודי עמים", "staff": "אשר ויצמן ושלמה ערוסי", "unc": false, "free": true}, {"id": "d-024", "kind": "dance", "date": "2026-07-28", "start": "14:00", "end": "15:00", "title": "בן הרי חברון", "venueId": "cafe-theater-yad-labanim", "cat": "זוגות", "audience": "הרקדת זוגות נוסטלגית", "staff": "תמיר שרצר", "unc": false, "free": true}, {"id": "d-025", "kind": "dance", "date": "2026-07-28", "start": "15:00", "end": "16:30", "title": "המייסדים", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "ריקודים של יוצרים ותיקים נכסי צאן ברזל של ריקודי העם", "staff": "יוצרים אורחים: אלי רונן, חיים שריון, משה תלם, אדי ששון, יוני קאר ועוד; מפיקים: אייל לוי, רן גולן", "unc": false, "free": true}, {"id": "d-026", "kind": "dance", "date": "2026-07-28", "start": "16:30", "end": "17:30", "title": "לגעת במים", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "הרקדה מוזיקלית לזכר נחום היימן", "staff": "אייל לוי, רן גולן", "unc": false, "free": true}, {"id": "d-027", "kind": "dance", "date": "2026-07-28", "start": "17:30", "end": "18:30", "title": "אקי\"ם", "venueId": "cafe-theater-yad-labanim", "cat": "גלגלים (נגישות)", "audience": "הרקדה ייעודית בגלגלים", "staff": "עדי וצופי אתרים, דיאנה ודוד ברש", "unc": false, "free": true}, {"id": "d-028", "kind": "dance", "date": "2026-07-28", "start": "12:00", "end": "13:30", "title": "בהר הגלבוע", "venueId": "yovel", "cat": "מעגלים", "audience": "מעגלים פתיחה - מעורב", "staff": "מזל תומר, עדנה פיאסטרו", "unc": false, "free": true}, {"id": "d-029", "kind": "dance", "date": "2026-07-28", "start": "13:30", "end": "14:30", "title": "סטופ", "venueId": "yovel", "cat": "משולב", "audience": "להיטים מעגלים וזוגות", "staff": "יוסי מיארה, דורית מור", "unc": false, "free": true}, {"id": "d-030", "kind": "dance", "date": "2026-07-28", "start": "14:30", "end": "16:00", "title": "ישראלי קומפלט", "venueId": "yovel", "cat": "משולב", "audience": "הרקדה ישראלית - מעגלים וזוגות", "staff": "חלי ליבנה, נושי אליאס", "unc": false, "free": true}, {"id": "d-031", "kind": "dance", "date": "2026-07-28", "start": "16:00", "end": "17:00", "title": "שיר לנטע", "venueId": "yovel", "cat": "זוגות", "audience": "בינלאומי - הרקדת זוגות עם מרקידות מחו\"ל", "staff": "אביבית בן משה (הולנד), אריאן בוטל (צרפת), רינה וגמן (בוסטון); יוצר אורח: תמיר שרצר", "unc": false, "free": true}, {"id": "d-032", "kind": "dance", "date": "2026-07-28", "start": "17:30", "end": "20:30", "title": "הרקדת פתיחה - נשים", "venueId": "yovel", "cat": "נשים בלבד", "audience": "פתיחה ומסיבה ישראלית - נשים בלבד", "staff": "מפיקות: אורלי שמש, אביבית רוזנברג; מרקידות: סימה שאול, דורית מור, אורלי שמש, אביבית רוזנברג, שלומית נגר", "unc": false, "free": true}, {"id": "d-033", "kind": "dance", "date": "2026-07-28", "start": "20:30", "end": "21:30", "title": "מישל", "venueId": "yovel", "cat": "זוגות", "audience": "זוגות להיטים", "staff": "נעמה חזן, יהודה שטרית", "unc": false, "free": true}, {"id": "d-034", "kind": "dance", "date": "2026-07-28", "start": "21:30", "end": "23:00", "title": "פגישה לאין קץ", "venueId": "yovel", "cat": "זוגות", "audience": "זוגות מכל הזמנים", "staff": "נורית גרינפלד, גלעד צעידי", "unc": false, "free": true}, {"id": "d-035", "kind": "dance", "date": "2026-07-28", "start": "23:00", "end": "01:00", "title": "מיני מרתון נשים", "venueId": "yovel", "cat": "נשים בלבד", "audience": "מיני מרתון - נשים בלבד", "staff": "מפיקה: אביטל חוברה; מרקידות: נעה רודמן, לילך שמואלי, אביבית רוזנברג, אביטל חוברה, רחלי בלו, דורית מור", "unc": false, "free": true}, {"id": "d-036", "kind": "dance", "date": "2026-07-29", "start": "09:30", "end": "10:30", "title": "סקולדאנס", "venueId": "hekhal-hakirya", "cat": "ילדים", "audience": "הרקדת ילדי בית הספר", "staff": "מפיקים: לוי ברגיל, דודו לוסקי; אריאלה גריסין, שוש גרגו אביטון; ניהול פרויקט: רונית זוהר", "unc": false, "free": true}, {"id": "d-037", "kind": "dance", "date": "2026-07-29", "start": "11:00", "end": "12:00", "title": "לאהוב אם אפשר", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "מעגלים של שמחה ואהבה", "staff": "עופרה יחזקאל, מיכל אפק", "unc": false, "free": true}, {"id": "d-038", "kind": "dance", "date": "2026-07-29", "start": "12:00", "end": "13:30", "title": "אהבנו", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מעגלים וזוגות מכל הזמנים - הרקדה בסימן אהבה", "staff": "מפיק: ויקטור גבאי; יוצרת אורחת: יוני קאר", "unc": false, "free": true}, {"id": "d-039", "kind": "dance", "date": "2026-07-29", "start": "14:00", "end": "15:00", "title": "פתאום קם אדם", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "ראש בראש: ירון בן שמחון & דודו ברזילי", "staff": "ירון בן שמחון, דודו ברזילי; מנחה: אילן סויסה", "unc": false, "free": true}, {"id": "d-040", "kind": "dance", "date": "2026-07-29", "start": "15:00", "end": "16:30", "title": "שינית את חיי", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "הרקדת זוגות מאמצע הדרך", "staff": "מפיק: שלומי מרדכי", "unc": false, "free": true}, {"id": "d-041", "kind": "dance", "date": "2026-07-29", "start": "16:30", "end": "18:00", "title": "שטיח פרסי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "סדנה עם היוצר מושיקו יצחק הלוי", "staff": "יוצר: מושיקו יצחק הלוי; מפיקים: תמיר שרצר, מיכל בכר", "unc": false, "free": true}, {"id": "d-042", "kind": "dance", "date": "2026-07-29", "start": "18:00", "end": "19:30", "title": "דבקה אלון", "venueId": "hekhal-hakirya", "cat": "דבקות", "audience": "הרקדת דבקות בליווי דרבוקה", "staff": "מפיקים: מימי קוגן, דודו ברזילי; דרבוקה: איתי בן ארצי", "unc": false, "free": true}, {"id": "d-043", "kind": "dance", "date": "2026-07-29", "start": "19:30", "end": "21:00", "title": "קולות הלב", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "הרקדת זוגות מיוחדת", "staff": "אפקה עובדיה, שמעון ורד", "unc": false, "free": true}, {"id": "d-044", "kind": "dance", "date": "2026-07-29", "start": "21:00", "end": "22:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "לוי ברגיל ויענקלה זיו", "unc": false, "free": true}, {"id": "d-045", "kind": "dance", "date": "2026-07-29", "start": "22:00", "end": "23:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "דרור דוידי ואורלי שמש", "unc": false, "free": true}, {"id": "d-046", "kind": "dance", "date": "2026-07-29", "start": "23:00", "end": "00:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "שלומי מרדכי ואלה עשור", "unc": false, "free": true}, {"id": "d-047", "kind": "dance", "date": "2026-07-30", "start": "00:00", "end": "01:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "שולמית רדה וארז טובול", "unc": false, "free": true}, {"id": "d-048", "kind": "dance", "date": "2026-07-30", "start": "01:00", "end": "02:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "נורית גרינפלד וזאב ניסים", "unc": false, "free": true}, {"id": "d-049", "kind": "dance", "date": "2026-07-30", "start": "02:00", "end": "03:00", "title": "מרתון מרכזי", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "דודו ברזילאי, תמיר שרצר ואפי קשרי", "unc": false, "free": true}, {"id": "d-050", "kind": "dance", "date": "2026-07-29", "start": "10:00", "end": "11:00", "title": "גדולות מהחיים", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "אשדוד עושה כבוד לגמלאיות מתנדבות מכל הארץ", "staff": "מפיקים: גילה קליין, עופר אלפסי", "unc": false, "free": true}, {"id": "d-051", "kind": "dance", "date": "2026-07-29", "start": "11:00", "end": "12:00", "title": "לשיר בקול ערב", "venueId": "cafe-theater-yad-labanim", "cat": "שירה בציבור", "audience": "שירים שרוקדים", "staff": "אלי לקס", "unc": false, "free": true}, {"id": "d-052", "kind": "dance", "date": "2026-07-29", "start": "12:00", "end": "13:00", "title": "על אהבה", "venueId": "cafe-theater-yad-labanim", "cat": "מעגלים", "audience": "הרקדת מעגלים", "staff": "אפי קשרי, ארז טובול", "unc": false, "free": true}, {"id": "d-053", "kind": "dance", "date": "2026-07-29", "start": "13:00", "end": "14:00", "title": "ריקדי", "venueId": "cafe-theater-yad-labanim", "cat": "מעגלים", "audience": "מעגלים בעיבודים מיוחדים", "staff": "עורך ומרקיד: אלעד תגר; מפיקה: שלי שקד", "unc": false, "free": true}, {"id": "d-054", "kind": "dance", "date": "2026-07-29", "start": "14:00", "end": "15:30", "title": "יפה את לי", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "ריקודים בנושא אהבת הארץ", "staff": "יוסי נקב, רונן עובד", "unc": false, "free": true}, {"id": "d-055", "kind": "dance", "date": "2026-07-29", "start": "15:30", "end": "17:00", "title": "אל תשטה באהבה", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "מריקודיהם של ישראל שיקר ונפתלי קדוש", "staff": "רחל ספרני, אורלי שמש", "unc": false, "free": true}, {"id": "d-056", "kind": "dance", "date": "2026-07-29", "start": "17:00", "end": "18:00", "title": "שובר שתיקה", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "שוברי מצעדים", "staff": "סימה שאול, ניסים חלפון", "unc": false, "free": true}, {"id": "d-057", "kind": "dance", "date": "2026-07-29", "start": "22:00", "end": "00:00", "title": "ספיישל הרקדת נשים", "venueId": "cafe-theater-yad-labanim", "cat": "נשים בלבד", "audience": "אירוע לילה - לנשים בלבד", "staff": "מפיקה: מיכל אפק; מרקידות: לילך שמואלי, מיכל אפק, דורית מור, נעה רויזמן", "unc": false, "free": true}, {"id": "d-058", "kind": "dance", "date": "2026-07-29", "start": "11:00", "end": "12:30", "title": "שורשים", "venueId": "yovel", "cat": "מעגלים", "audience": "מעגלים מכל הזמנים - מעורב", "staff": "אביבית רוזנברג, שלומית נגר, נועה בר אור", "unc": false, "free": true}, {"id": "d-059", "kind": "dance", "date": "2026-07-29", "start": "12:30", "end": "14:00", "title": "מעגלים ללא גבולות", "venueId": "yovel", "cat": "מעגלים", "audience": "ריקודי מעגלים מסוגננים ויפים מכל הזמנים - מעורב", "staff": "מיכל בכר, תמיר שרצר", "unc": false, "free": true}, {"id": "d-060", "kind": "dance", "date": "2026-07-29", "start": "14:00", "end": "15:30", "title": "אתה לי ארץ", "venueId": "yovel", "cat": "זוגות", "audience": "אמצע הדרך - הרקדת זוגות משובחת", "staff": "גיל בן הרוש, מורל רביד", "unc": false, "free": true}, {"id": "d-061", "kind": "dance", "date": "2026-07-29", "start": "15:30", "end": "17:00", "title": "מחווה ליוצרים צעירים", "venueId": "yovel", "cat": "משולב", "audience": "יוצרים צעירים", "staff": "אורחים: ארז טובול, אפי קשרי, חלי ליבנה, גילה סולומון, רעות ראוף, חיה פרג'ון; מפיק ומארח: אילן סויסה", "unc": false, "free": true}, {"id": "d-062", "kind": "dance", "date": "2026-07-29", "start": "17:00", "end": "18:30", "title": "עולם ומלואו", "venueId": "yovel", "cat": "משולב", "audience": "מכל העולם - ריקודים לשירים מיוון, דרום אמריקה, רוסיה, צרפת ועוד.", "staff": "נפתלי חיים, ענת אביב", "unc": false, "free": true}, {"id": "d-063", "kind": "dance", "date": "2026-07-29", "start": "18:30", "end": "20:00", "title": "עוד ועוד", "venueId": "yovel", "cat": "משולב", "audience": "הרקדת אמצע הדרך ונוסטלגיה", "staff": "ינאי ריין, קובי ניגרקר", "unc": false, "free": true}, {"id": "d-064", "kind": "dance", "date": "2026-07-29", "start": "20:00", "end": "21:00", "title": "מרתון הנוסטלגיה הגדול", "venueId": "yovel", "cat": "משולב", "audience": "נוסטלגיה - מרתון לילה", "staff": "ירון מישר ואבי עזר", "unc": false, "free": true}, {"id": "d-065", "kind": "dance", "date": "2026-07-29", "start": "21:00", "end": "22:00", "title": "מרתון הנוסטלגיה הגדול", "venueId": "yovel", "cat": "משולב", "audience": "נוסטלגיה - מרתון לילה", "staff": "אבנר נעים ומימי קוגן", "unc": false, "free": true}, {"id": "d-066", "kind": "dance", "date": "2026-07-29", "start": "22:00", "end": "23:00", "title": "מרתון הנוסטלגיה הגדול", "venueId": "yovel", "cat": "משולב", "audience": "נוסטלגיה - מרתון לילה", "staff": "זאב ניסים ונורית גרינפלד", "unc": false, "free": true}, {"id": "d-067", "kind": "dance", "date": "2026-07-29", "start": "23:00", "end": "00:00", "title": "מרתון הנוסטלגיה הגדול", "venueId": "yovel", "cat": "משולב", "audience": "נוסטלגיה - מרתון לילה", "staff": "יענקלה זיו ותמיר שרצר", "unc": false, "free": true}, {"id": "d-068", "kind": "dance", "date": "2026-07-30", "start": "00:00", "end": "01:00", "title": "מרתון הנוסטלגיה הגדול", "venueId": "yovel", "cat": "משולב", "audience": "נוסטלגיה - מרתון לילה", "staff": "אייל לוי וינאי ריין", "unc": false, "free": true}, {"id": "d-069", "kind": "dance", "date": "2026-07-30", "start": "10:00", "end": "11:00", "title": "חג המשק", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "ריקודים מהשנים 2024-2026", "staff": "אברהם קדוש, אפי קשרי", "unc": false, "free": true}, {"id": "d-070", "kind": "dance", "date": "2026-07-30", "start": "11:00", "end": "12:30", "title": "דמעות שחורות", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "רוקדים לשירי שלמה ארצי, מעגלים - חצי שעה וזוגות - שעה", "staff": "אפקה עובדיה, גיל בן הרוש", "unc": false, "free": true}, {"id": "d-071", "kind": "dance", "date": "2026-07-30", "start": "12:30", "end": "14:00", "title": "זאבים", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "ריקודי מעגל מאתגרים ומיוחדים", "staff": "תמיר שרצר, אילן סויסה; יוצר אורח: ירון מליחי", "unc": false, "free": true}, {"id": "d-072", "kind": "dance", "date": "2026-07-30", "start": "14:00", "end": "15:00", "title": "קרנבל", "venueId": "hekhal-hakirya", "cat": "שורות", "audience": "ריקודי שורות מהארץ ומחו\"ל", "staff": "מפיקות: בר מזרחי, אירית וקנין, ואורפז פורגס בהשתתפות יוצרים אורחים", "unc": false, "free": true}, {"id": "d-073", "kind": "dance", "date": "2026-07-30", "start": "15:00", "end": "16:30", "title": "תיבת נוח", "venueId": "hekhal-hakirya", "cat": "זוגות", "audience": "קאמבק - ההרקדה המפורסמת של ירושלים", "staff": "מפיק: ירון בן שמחון", "unc": false, "free": true}, {"id": "d-074", "kind": "dance", "date": "2026-07-30", "start": "16:30", "end": "18:00", "title": "תימניאדה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "בסגנון תימני", "staff": "ירון מליחי, תמיר שלו, שלמה ערוסי", "unc": false, "free": true}, {"id": "d-075", "kind": "dance", "date": "2026-07-30", "start": "18:00", "end": "20:00", "title": "מ\"ערב שבת\" עד \"בא לי\"", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "הצדעה ליוצר: אבנר נעים – זוכה פרס היצירה ופרס אקום. נלמד עם היוצר 2 ריקודים בבכורה עולמית", "staff": "יוצר: אבנר נעים; מפיק: דודו ברזילי", "unc": false, "free": true}, {"id": "d-076", "kind": "dance", "date": "2026-07-30", "start": "20:00", "end": "21:00", "title": "כורדיאדה", "venueId": "hekhal-hakirya", "cat": "מעגלים", "audience": "הרקדת מעגלים תוססת ואנרגטית בליווי דרבוקה", "staff": "שלומית רדה, עופר צופי", "unc": false, "free": true}, {"id": "d-077", "kind": "dance", "date": "2026-07-30", "start": "21:00", "end": "22:00", "title": "מעגלים וזוגות", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מקצה ערב.", "staff": "תמיר שלו", "unc": false, "free": true}, {"id": "d-078", "kind": "dance", "date": "2026-07-30", "start": "22:00", "end": "23:00", "title": "מעגלים וזוגות", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מקצה ערב.", "staff": "שלמה ערוסי, ירון מליחי", "unc": false, "free": true}, {"id": "d-079", "kind": "dance", "date": "2026-07-30", "start": "23:00", "end": "00:00", "title": "מרתון נעילה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "עופר צופי ומזל תומר", "unc": false, "free": true}, {"id": "d-080", "kind": "dance", "date": "2026-07-30", "start": "00:00", "end": "01:00", "title": "מרתון נעילה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "פנינה קליין ומירי אקוני", "unc": false, "free": true}, {"id": "d-081", "kind": "dance", "date": "2026-07-30", "start": "01:00", "end": "02:00", "title": "מרתון נעילה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "ירון בן שמחון ויעל טויטו", "unc": false, "free": true}, {"id": "d-082", "kind": "dance", "date": "2026-07-30", "start": "02:00", "end": "03:00", "title": "מרתון נעילה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "אנדרה שור ושמעון ורד", "unc": false, "free": true}, {"id": "d-083", "kind": "dance", "date": "2026-07-30", "start": "03:00", "end": "04:00", "title": "מרתון נעילה", "venueId": "hekhal-hakirya", "cat": "משולב", "audience": "מרתון לילה", "staff": "דודו ברזילי וסמדר עשור", "unc": false, "free": true}, {"id": "d-084", "kind": "dance", "date": "2026-07-30", "start": "10:00", "end": "11:30", "title": "אשדוד הבוקר", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "הרקדת בוקר", "staff": "ז'ק אוחיון", "unc": false, "free": true}, {"id": "d-085", "kind": "dance", "date": "2026-07-30", "start": "11:30", "end": "13:00", "title": "שבע", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "מעגלים וזוגת לכולם", "staff": "גיא שרעבי, אתי ביטון", "unc": false, "free": true}, {"id": "d-086", "kind": "dance", "date": "2026-07-30", "start": "13:00", "end": "14:00", "title": "דבקה איציק", "venueId": "cafe-theater-yad-labanim", "cat": "מעגלים", "audience": "הרקדת מעגלים כיפית", "staff": "קרן אורן, אברהם קדוש", "unc": false, "free": true}, {"id": "d-087", "kind": "dance", "date": "2026-07-30", "start": "14:00", "end": "15:00", "title": "שיר השירים", "venueId": "cafe-theater-yad-labanim", "cat": "משולב", "audience": "שירים ביצועם של \"הפרויקט של רביבו\"", "staff": "יוסי מיארה, גילה סולומון", "unc": false, "free": true}, {"id": "d-088", "kind": "dance", "date": "2026-07-30", "start": "15:00", "end": "17:00", "title": "מצליחים", "venueId": "cafe-theater-yad-labanim", "cat": "קורסים", "audience": "מסיימי קורסי מדריכים 2026-2023", "staff": "15:00-15:30 זוהר אמסלם (מסיים קורס 2024-2023); מפיקה: שלי שקד", "unc": false, "free": true}, {"id": "d-089", "kind": "dance", "date": "2026-07-30", "start": "17:00", "end": "18:00", "title": "הרקדת מחווה לגלי אזולאי ז\"ל", "venueId": "cafe-theater-yad-labanim", "cat": "זיכרון והוקרה", "audience": "לזכר גלי אזולאי ז\"ל (לוס אנג'לס)", "staff": "מפיקה: סמדר עשור", "unc": false, "free": true}, {"id": "d-090", "kind": "dance", "date": "2026-07-30", "start": "23:00", "end": "04:00", "title": "באה מאהבה", "venueId": "yovel", "cat": "נשים בלבד", "audience": "מרתון - נשים בלבד", "staff": "מפיקות: אתי מעודה, שלומית נגר; מרקידות: רלי אבמן, קרן אורן, אביבית רוזנברג, חני דהן, אתי מעודה, שלומית נגר, צביה וייל, אביטל חוברה, מיכל אפק, גילה סולומון, מיכל בכר, נועה בר אור", "unc": false, "free": true}, {"id": "d-091", "kind": "dance", "date": "2026-07-30", "start": "10:00", "end": "11:30", "title": "שמש אדומה", "venueId": "yovel", "cat": "מעגלים", "audience": "הרקדת מעגלים מגוונת - מעורב", "staff": "מיכל אפק, קרן אורן", "unc": false, "free": true}, {"id": "d-092", "kind": "dance", "date": "2026-07-30", "start": "11:30", "end": "12:30", "title": "חלקת אלוהים", "venueId": "yovel", "cat": "מעגלים", "audience": "שעה של מעגלים יפים - מעורב", "staff": "עידית שמש, נושי אליאס", "unc": false, "free": true}, {"id": "d-093", "kind": "dance", "date": "2026-07-30", "start": "12:30", "end": "14:00", "title": "סולטנה", "venueId": "yovel", "cat": "זוגות", "audience": "זוגות מכל הזמנים", "staff": "חיים מילשטיין, חיים וקנין", "unc": false, "free": true}, {"id": "d-094", "kind": "dance", "date": "2026-07-30", "start": "14:00", "end": "15:00", "title": "שיר אהבה", "venueId": "yovel", "cat": "זוגות", "audience": "סדנת זוגות עם יוצר אורח", "staff": "מימי קוגן; יוצר אורח: ירון מליחי", "unc": false, "free": true}, {"id": "d-095", "kind": "dance", "date": "2026-07-30", "start": "15:00", "end": "16:00", "title": "4 על 4", "venueId": "yovel", "cat": "מעגלים", "audience": "רצף של 4 ריקודים ליוצר נבחר - מעורב", "staff": "קרן אורן, נועה בר אור", "unc": false, "free": true}, {"id": "d-096", "kind": "dance", "date": "2026-07-30", "start": "16:00", "end": "17:30", "title": "אנשי הדממה", "venueId": "yovel", "cat": "משולב", "audience": "הרקדת אמצע הדרך", "staff": "דורון ואפרת ורדי", "unc": false, "free": true}, {"id": "d-097", "kind": "dance", "date": "2026-07-30", "start": "17:30", "end": "18:30", "title": "מלטידה לונה", "venueId": "yovel", "cat": "זוגות", "audience": "הרקדת זוגות לטינית", "staff": "אורי אקוע, צורי מכלוף", "unc": false, "free": true}, {"id": "d-098", "kind": "dance", "date": "2026-07-30", "start": "18:30", "end": "19:30", "title": "בכורה באשדודאנס! נשים", "venueId": "yovel", "cat": "נשים בלבד", "audience": "הרקדת זוגות בת שעה לנשים בלבד", "staff": "אתי מעודה, גילה בונקר", "unc": false, "free": true}, {"id": "d-099", "kind": "dance", "date": "2026-07-30", "start": "19:30", "end": "21:00", "title": "נבראתי לך", "venueId": "yovel", "cat": "זוגות", "audience": "אמצע הדרך", "staff": "מייק ורון, אירית שטרנברג", "unc": false, "free": true}, {"id": "d-100", "kind": "dance", "date": "2026-07-30", "start": "21:00", "end": "22:00", "title": "מלך העולם", "venueId": "yovel", "cat": "מעגלים", "audience": "מן המקורות ובסימן דת ואמונה - מעורב", "staff": "כרמית שימקו, שירה ויצמן", "unc": false, "free": true}, {"id": "d-101", "kind": "dance", "date": "2026-07-30", "start": "22:00", "end": "23:00", "title": "לרקוד", "venueId": "yovel", "cat": "משולב", "audience": "מקצה ערב", "staff": "חיים אוחיון, שירלי עומרי", "unc": false, "free": true}, {"id": "s-001", "kind": "show", "date": "2026-07-27", "start": "18:30", "end": null, "title": "ALMA GALBI - פלמנקו לעפרה חזה", "venueId": "yad-labanim", "cat": "מופע מרכזי", "subtype": "מופע פלמנקו", "desc": "מופע פלמנקו המוקדש לעפרה חזה.", "artists": "ALMA GALBI", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-002", "kind": "show", "date": "2026-07-27", "start": "20:30", "end": null, "title": "מיכה שטרית - מוזיקה, מילים ונשמה", "venueId": "mishkan-ashdod", "cat": "מופע מרכזי", "subtype": "מופע מוזיקלי", "desc": "מיכה שיטרית מהיוצרים המובילים מגיע עם הלהקה למופע מרגש ומארח את מוש בן ארי", "artists": "מיכה שטרית, אורח מיוחד: מוש בן ארי", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-003", "kind": "show", "date": "2026-07-27", "start": "22:00", "end": null, "title": "טברנה יוונית - עם אסי יחיאל", "venueId": "cafe-theater-yad-labanim", "cat": "מופע מרכזי", "subtype": "טברנה יוונית", "desc": "ערב בסגנון יווני.", "artists": "אסי יחיאל", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-004", "kind": "show", "date": "2026-07-28", "start": "17:00", "end": null, "title": "הורה אהבה - מופע מחול", "venueId": "yad-labanim", "cat": "מופע מרכזי", "subtype": "מופע מחול", "desc": "מופע מחול.", "artists": "הפקת מקור בבימוי ליאת כץ פרחן", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-005", "kind": "show", "date": "2026-07-28", "start": "19:00", "end": null, "title": "אהבה בצלילים - מופע להקות 30+", "venueId": "mishkan-ashdod", "cat": "מופע מרכזי", "subtype": "מופע מחול", "desc": "להקות מחול מקצועיות מרחבי הארץ עם רקדניות ורקדנים 30+", "artists": "להקות 30+", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-006", "kind": "show", "date": "2026-07-28", "start": "20:00", "end": null, "title": "טברנה יוונית - עם אסי יחיאל", "venueId": "cafe-theater-yad-labanim", "cat": "מופע מרכזי", "subtype": "טברנה יוונית", "desc": "ערב בסגנון יווני.", "artists": "אסי יחיאל", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-007", "kind": "show", "date": "2026-07-28", "start": "21:00", "end": null, "title": "מופע פתיחה: עכשיו התור לאהבה", "venueId": "amphi-ashdod", "cat": "מופע מרכזי", "subtype": "מופע פתיחה - מוזיקה ומחול", "desc": "מופע הפתיחה המרכזי של הפסטיבל.", "artists": "הראל סקעת, מירי מסיקה, קרן פלס, שירי מימון, להקת אזימוט ו-2,000 רקדנים", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-008", "kind": "show", "date": "2026-07-29", "start": "18:00", "end": null, "title": "אילנית - מופע חדש שישה עשורים", "venueId": "yad-labanim", "cat": "מופע מרכזי", "subtype": "מופע מוזיקלי", "desc": "זמרת על זמנית המציינת שישה עשורי פעילוץ, 600 שירים ו-30 אלבומים", "artists": "אילנית, אורחת מיוחדת: ואלרי חמאתי", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-009", "kind": "show", "date": "2026-07-29", "start": "19:00", "end": null, "title": "עילי בוטנר והלהקה - בוא לאור", "venueId": "mishkan-ashdod", "cat": "מופע מרכזי", "subtype": "שילוב של הופעה מוזיקלית ומחול מקצועי", "desc": "זהו מפגש בין פופ ישראלי אהוב לבין מחול עכשווי", "artists": "עילי בוטנר והלהקה יחד עם להקות מחול מקצועיות", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-010", "kind": "show", "date": "2026-07-29", "start": "20:00", "end": null, "title": "טברנה עם ואלרי חמאתי - סיבה לשמוח", "venueId": "cafe-theater-yad-labanim", "cat": "מופע מרכזי", "subtype": "מופע טברנה מוזיקלית", "desc": "טברנה תחת הכותרת סיבה לשמוח.", "artists": "ואלרי חמתי ולהקות מחול מקצועיות", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-011", "kind": "show", "date": "2026-07-30", "start": "19:00", "end": null, "title": "מחזמר על הקרח - Musical on Ice", "venueId": "mishkan-ashdod", "cat": "מופע מרכזי", "subtype": "מחזמר על הקרח - לכל המשפחה", "desc": "לכל המשפחה עם להיטים מסרטי האנימציה Frozen 1&2.", "artists": "החלקה אמנותית מרהיבה וקטעי קרקס על הקרח עוצרי נשימה", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-012", "kind": "show", "date": "2026-07-30", "start": "21:00", "end": null, "title": "מופע נעילה- מסיבה ישראלית", "venueId": "amphi-ashdod", "cat": "מופע מרכזי", "subtype": "מופע נעילה - מוזיקה ומחול", "desc": "הנעילה המרכזית של הפסטיבל.", "artists": "ליאור נרקיס, שלומי שבת, רוני דלומי, אבי טולדנו, יזהר כהן ו-2,000 רקדנים", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-013", "kind": "show", "date": "2026-07-30", "start": "22:00", "end": null, "title": "טברנה מרוקאית עם חיים זריהן", "venueId": "cafe-theater-yad-labanim", "cat": "מופע מרכזי", "subtype": "טברנה מרוקאית", "desc": "ערב בסגנון מרוקאי.", "artists": "חיים זריהן והרכב נגנים", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-014", "kind": "show", "date": "2026-07-28", "start": "17:00", "end": null, "title": "מסביב לעולם עם רפי אלקובי - יפן", "venueId": "monart", "cat": "מופע מרכזי", "subtype": "הרצאה", "desc": "מסע אישי אל לב \"ארץ השמש העולה\"", "artists": "רפי אלקובי", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}, {"id": "s-015", "kind": "show", "date": "2026-07-30", "start": "17:00", "end": null, "title": "תוכו רצוף אהבה - כשהלב מתחיל לנוע", "venueId": "monart", "cat": "מופע מרכזי", "subtype": "מופע מחול", "desc": "עיבודי מחול לשירי אהבה ישראלים - הפקת מקור", "artists": "הפקת מקור של לירז בשארי ובבימוי לירן זכריה אמיר", "notes": "מידע וכרטיסים: 08-9522242, WWW.ASHDODANCE.CO.IL", "unc": false, "free": false}];

const VENUES = {"hekhal-hakirya": {"name": "אולם הקריה (היכל הספורט הקריה)", "address": "רחוב העצמאות 60, אשדוד", "notes": "מארח את תוכנית ההרקדות המרכזית - כניסה חופשית"}, "yovel": {"name": "אולם ביה\"ס היובל", "address": "בסמוך להיכל הספורט הקריה, רח' העצמאות, אשדוד", "notes": "כניסה חופשית"}, "cafe-theater-yad-labanim": {"name": "קפה תיאטרון - בית יד לבנים", "address": "דרך ארץ 1, אשדוד", "notes": "כניסה חופשית להרקדות, בתשלום למופעים"}, "yad-labanim": {"name": "בית יד לבנים", "address": "הבנים 3, אשדוד", "notes": "מופעים בתשלום - כרטיסים: 08-9522242"}, "mishkan-ashdod": {"name": "משכן אשדוד (המשכן לאמנויות הבמה)", "address": "דרך ארץ, אשדוד", "notes": "מופעים בתשלום - כרטיסים: 08-9522242"}, "amphi-ashdod": {"name": "אמפי אשדוד", "address": "רחוב מפקורה, אשדוד", "notes": "מופעי הפתיחה/נעילה המרכזיים - בתשלום"}, "monart": {"name": "מונארט מרכז תרבות", "address": "הבנים 3, אשדוד", "notes": "הרצאות ומופעים נלווים"}};

const DAY_META = {
  "2026-07-27": { label: "27.7", weekday: "יום שני",   color: "#C81D3E" },
  "2026-07-28": { label: "28.7", weekday: "יום שלישי",  color: "#E2572E" },
  "2026-07-29": { label: "29.7", weekday: "יום רביעי",  color: "#C1861A" },
  "2026-07-30": { label: "30.7", weekday: "יום חמישי",  color: "#6A2C6E" },
};

const DATES = ["2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30"];

const DANCE_VENUE_ORDER = ["hekhal-hakirya", "yovel", "cafe-theater-yad-labanim"];
const SHOW_VENUE_ORDER = ["amphi-ashdod", "mishkan-ashdod", "yad-labanim", "cafe-theater-yad-labanim", "monart"];
const ALL_VENUE_ORDER = [
  ...DANCE_VENUE_ORDER,
  ...SHOW_VENUE_ORDER.filter((v) => !DANCE_VENUE_ORDER.includes(v)),
];

const PRESETS = [
  { label: "זמן אמת", value: null },
  { label: "שני 20:30", value: "2026-07-27T20:30" },
  { label: "שלישי 19:00", value: "2026-07-28T19:00" },
  { label: "רביעי 22:00", value: "2026-07-29T22:00" },
  { label: "חמישי 01:30", value: "2026-07-30T01:30" },
];


function eventStartDate(ev) {
  return new Date(`${ev.date}T${(ev.start || "00:00")}:00`);
}
function eventEndDate(ev) {
  const start = eventStartDate(ev);
  let end;
  if (ev.end) {
    end = new Date(`${ev.date}T${ev.end}:00`);
    if (end <= start) end.setDate(end.getDate() + 1); // overnight event
  } else {
    end = new Date(start.getTime() + 60 * 60 * 1000); // default 1h
  }
  return end;
}

// Tries the modern Clipboard API first, then the legacy execCommand fallback
// (needed because some embedded/sandboxed viewers block the Clipboard API).
// Returns true if copying succeeded automatically, false if the caller should
// show the text for manual copying instead.
function buildShareText(savedEvents, notes) {
  return savedEvents
    .map((e) => {
      const dateLabel = DAY_META[e.date] ? `${DAY_META[e.date].weekday} ${DAY_META[e.date].label}` : e.date;
      const timeLabel = `${e.start}${e.end ? `–${e.end}` : ""}`;
      const venue = VENUES[e.venueId]?.name || "";
      const content =
        e.kind === "show"
          ? [e.subtype, e.desc].filter(Boolean).join(" | ") + (e.artists ? `\nמשתתפים: ${e.artists}` : "")
          : [e.audience, e.staff ? `צוות: ${e.staff}` : ""].filter(Boolean).join("\n");
      const lines = [
        `📅 ${dateLabel} · ⏰ ${timeLabel} — ${e.title}`,
        `📍 ${venue}`,
      ];
      if (content) lines.push(content);
      if (e.kind === "show" && e.notes) lines.push(e.notes);
      if (notes[e.id]) lines.push(`📝 הערה שלי: ${notes[e.id]}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    // fall through to legacy method
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (ok) return true;
  } catch (e) {
    // fall through
  }
  return false;
}

const CAT_ICON = {
  "מופע מרכזי": "★",
  "נשים בלבד": "♀",
  "סדנה": "✎",
  "זוגות": "♪",
  "מעגלים": "○",
  "משולב": "◐",
  "גלגלים (נגישות)": "♿",
  "דבקות": "🥁",
  "ילדים": "🧒",
  "קורסים": "🎓",
  "שורות": "☰",
  "שירה בציבור": "🎤",
  "זיכרון והוקרה": "🕯",
};

function renderNotes(text) {
  if (!text) return null;
  const urlMatch = text.match(/(WWW\.[A-Z0-9.-]+\.[A-Z]{2,})/i);
  if (!urlMatch) return text;
  const url = urlMatch[1];
  const before = text.slice(0, urlMatch.index);
  const after = text.slice(urlMatch.index + url.length);
  return (
    <>
      {before}
      <a
        href={`https://${url.toLowerCase()}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#C1861A", textDecoration: "underline" }}
      >
        {url}
      </a>
      {after}
    </>
  );
}

function fmtDateHe(dateStr) {
  const meta = DAY_META[dateStr];
  return meta ? `${meta.weekday} ${meta.label}` : dateStr;
}

function EventCard({ ev, dayColor, isSaved, onToggle, showDate, isLive, removeMode, children }) {
  const color = dayColor || (DAY_META[ev.date] ? DAY_META[ev.date].color : "#241623");
  return (
    <div
      className="rounded-2xl p-3.5 flex flex-col gap-2"
      style={{
        background: "#FFFFFF",
        borderRight: `4px solid ${color}`,
        boxShadow: "0 1px 3px rgba(36,22,35,0.08)",
      }}
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {isLive && (
              <span className="flex items-center gap-1 font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#C81D3E", color: "#FBF3E6", fontSize: "10px" }}>
                <span className="w-1.5 h-1.5 rounded-full pop-anim" style={{ background: "#FBF3E6" }} /> קורה עכשיו
              </span>
            )}
            {showDate && (
              <span className="px-1.5 py-0.5 rounded-full" style={{ background: `${color}22`, color, fontSize: "10px" }}>
                {fmtDateHe(ev.date)}
              </span>
            )}
            {/* 1. שעה + קטגוריה/סוג-פורמט */}
            <span className="flex items-center gap-1 text-xs font-bold" style={{ color }}>
              <Clock size={12} /> {ev.start}{ev.end ? `–${ev.end}` : ""}
            </span>
            <span className="px-1.5 py-0.5 rounded-full" style={{ background: "#241623", color: "#EDE3D0", fontSize: "10px" }}>
              {CAT_ICON[ev.cat]} {ev.cat}
            </span>
            {ev.free && (
              <span className="px-1.5 py-0.5 rounded-full" style={{ background: "#E8A93D33", color: "#8A5A0F", fontSize: "10px" }}>
                כניסה חופשית
              </span>
            )}
          </div>

          {/* 2. שם האירוע/מופע - בולד */}
          <h3 className="font-bold leading-tight" style={{ color: "#241623", fontSize: "15px" }}>{ev.title}</h3>

          {ev.kind === "show" ? (
            <>
              {/* 3. סוג פורמט | תיאור וקהל יעד */}
              {(ev.subtype || ev.desc) && (
                <p className="mt-1 leading-snug" style={{ color: "#6B5B63", fontSize: "12px" }}>
                  {[ev.subtype, ev.desc].filter(Boolean).join(" | ")}
                </p>
              )}
              {/* 4. אמנים ומשתתפים - בולד */}
              {ev.artists && (
                <p className="font-bold mt-1 leading-snug" style={{ color: "#241623", fontSize: "12.5px" }}>
                  {ev.artists}
                </p>
              )}
              {/* 5. מתחם */}
              <p className="flex items-center gap-1 mt-1" style={{ color: "#6B5B63", fontSize: "12px" }}>
                <MapPin size={11} className="flex-shrink-0" /> {VENUES[ev.venueId]?.name}
              </p>
              {/* 6. תוכן עמודת "כניסה והערות" */}
              {ev.notes && (
                <p className="mt-0.5 leading-snug whitespace-nowrap" style={{ color: "#9C8F86", fontSize: "10px" }}>
                  {renderNotes(ev.notes)}
                </p>
              )}
            </>
          ) : (
            <>
              {/* 3. קהל יעד / רמה / תקופה */}
              {ev.audience && (
                <p className="mt-1 leading-snug" style={{ color: "#6B5B63", fontSize: "12px" }}>
                  {ev.audience}
                </p>
              )}
              {/* 4. צוות מקצועי - בולד */}
              {ev.staff && (
                <p className="font-bold mt-1 leading-snug" style={{ color: "#241623", fontSize: "12.5px" }}>
                  {ev.staff}
                  {ev.unc && <span className="font-normal" style={{ color: "#C1861A", fontSize: "10px" }}> · לאמת שם</span>}
                </p>
              )}
              <p className="flex items-center gap-1 mt-1" style={{ color: "#6B5B63", fontSize: "12px" }}>
                <MapPin size={11} className="flex-shrink-0" /> {VENUES[ev.venueId]?.name}
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => onToggle(ev)}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 self-start ${isSaved && !removeMode ? "pop-anim" : ""}`}
          style={{ background: removeMode ? "#F3ECDF" : isSaved ? "#E8A93D" : "#F3ECDF" }}
          aria-label={removeMode ? "הסר משריון" : "שריין אירוע"}
        >
          {removeMode ? (
            <X size={16} color="#B0A296" />
          ) : (
            <Heart size={15} color={isSaved ? "#241623" : "#B0A296"} fill={isSaved ? "#241623" : "none"} />
          )}
        </button>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [catFilter, setCatFilter] = useState("all"); // all | show | dance
  const [tab, setTab] = useState("program");
  const [saved, setSaved] = useState({});
  const [notes, setNotes] = useState({});
  const [hydrated, setHydrated] = useState(false);

  // Load any previously saved picks/notes from this device on first render.
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY_SAVED);
      const n = localStorage.getItem(STORAGE_KEY_NOTES);
      if (s) setSaved(JSON.parse(s));
      if (n) setNotes(JSON.parse(n));
    } catch (e) {
      // localStorage unavailable (private browsing etc.) - app still works, just won't persist
    }
    setHydrated(true);
  }, []);

  // Persist picks to this device whenever they change (after the initial load above).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(saved));
    } catch (e) {}
  }, [saved, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    } catch (e) {}
  }, [notes, hydrated]);

  const [shareFallback, setShareFallback] = useState(null); // text to show for manual copy when auto-copy fails
  const updateNote = (id, value) => setNotes((prev) => ({ ...prev, [id]: value }));
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const [customNowStr, setCustomNowStr] = useState(PRESETS[1].value); // default to a lively demo moment
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (customNowStr) return; // only tick real clock in real-time mode
    const t = setInterval(() => setTick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, [customNowStr]);

  const effectiveNow = useMemo(() => {
    return customNowStr ? new Date(customNowStr) : new Date();
  }, [customNowStr, tick]);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const toggleSave = (ev) => {
    setSaved((prev) => {
      const next = { ...prev };
      if (next[ev.id]) {
        delete next[ev.id];
        showToast("הוסר מהלו\"ז שלי");
      } else {
        next[ev.id] = ev;
        showToast("נשמר בלו\"ז שלי");
      }
      return next;
    });
  };

  const savedList = useMemo(
    () =>
      Object.values(saved).sort(
        (a, b) => eventStartDate(a) - eventStartDate(b)
      ),
    [saved]
  );

  const matchesFilter = (ev) => {
    if (catFilter === "all") return true;
    if (catFilter === "show") return ev.cat === "מופע מרכזי";
    return ev.cat !== "מופע מרכזי"; // "dance" - all led/participatory dance sessions
  };

  const dayEventsByVenue = useMemo(() => {
    const dayEvents = [...EVENTS].filter((e) => e.date === selectedDate && matchesFilter(e)).sort(
      (a, b) => eventStartDate(a) - eventStartDate(b)
    );
    const groups = {};
    dayEvents.forEach((e) => {
      if (!groups[e.venueId]) groups[e.venueId] = [];
      groups[e.venueId].push(e);
    });
    return groups;
  }, [selectedDate, catFilter]);

  const { liveNow, upcoming } = useMemo(() => {
    const all = [...EVENTS];
    const live = all
      .filter((e) => eventStartDate(e) <= effectiveNow && effectiveNow < eventEndDate(e))
      .sort((a, b) => eventStartDate(a) - eventStartDate(b));
    const next = all
      .filter((e) => eventStartDate(e) > effectiveNow)
      .sort((a, b) => eventStartDate(a) - eventStartDate(b))
      .slice(0, 10);
    return { liveNow: live, upcoming: next };
  }, [effectiveNow]);

  const dayColor = DAY_META[selectedDate].color;
  const currentVenueOrder = catFilter === "show" ? SHOW_VENUE_ORDER : catFilter === "dance" ? DANCE_VENUE_ORDER : ALL_VENUE_ORDER;
  const nowLabel = effectiveNow.toLocaleString("he-IL", { weekday: "long", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="outer-wrap min-h-screen w-full flex items-center justify-center p-4" style={{ background: "#EDE3D0", fontFamily: "'Rubik', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700;900&family=Rubik:wght@400;500;600;700&display=swap');
        .phone-frame { font-family: 'Rubik', sans-serif; }
        .display-font { font-family: 'Frank Ruhl Libre', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pop { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.6; } 100% { transform: scale(1); opacity: 1; } }
        .pop-anim { animation: pop 1.4s ease-in-out infinite; }
        /* Mobile-only app: on small/real phone viewports, fill the screen edge-to-edge
           instead of showing the decorative desktop-preview phone mockup. */
        @media (max-width: 600px) {
          .outer-wrap { padding: 0 !important; align-items: stretch !important; }
          .phone-frame {
            width: 100% !important;
            max-width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      <div
        className="phone-frame relative w-full max-w-sm overflow-hidden shadow-2xl flex flex-col"
        style={{ background: "#FBF3E6", border: "10px solid #241623", direction: "rtl", height: "820px", maxHeight: "90vh", borderRadius: "2.5rem" }}
        dir="rtl"
        lang="he"
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex-shrink-0" style={{ background: "#241623" }}>
          <div>
            <p style={{ color: "#E8A93D", fontSize: "11px", letterSpacing: "0.25em" }}>FEST · DANCE WITH LOVE</p>
            <h1 className="display-font text-3xl font-bold" style={{ color: "#FBF3E6" }}>אשדודאנס 2026</h1>
            <p className="text-xs mt-0.5" style={{ color: "#C9BBB0" }}>27–30.7 · הפסטיבל הבינלאומי למחול · אשדוד</p>
          </div>

          {/* Day chain selector - always visible (pinned header), on every tab, so the chosen day never scrolls away */}
          <div className="mt-5 relative">
            <div className="absolute top-1/2 right-2 left-2 h-0.5 -translate-y-1/2" style={{ background: "#4A3A54" }} />
            <div className="relative flex justify-between">
              {DATES.map((d) => {
                const meta = DAY_META[d];
                const active = d === selectedDate;
                return (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDate(d);
                      if (tab !== "now") setTab("program");
                    }}
                    className="flex flex-col items-center gap-1 focus:outline-none"
                  >
                    <span
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-transform"
                      style={{
                        background: active ? meta.color : "#3A2C42",
                        color: "#FBF3E6",
                        border: active ? "2px solid #FBF3E6" : "2px solid transparent",
                        transform: active ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {meta.label}
                    </span>
                    <span style={{ color: active ? "#FBF3E6" : "#8A7B84", fontSize: "10px" }}>
                      {meta.weekday}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filter row - always visible, filters the Program tab for the selected day */}
          <div className="mt-3 flex gap-1.5">
            {[
              { key: "show", label: "מופעים" },
              { key: "dance", label: "הרקדות" },
              { key: "all", label: "כלל האירועים" },
            ].map((f) => {
              const active = catFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => {
                    setCatFilter(f.key);
                    setTab("program");
                  }}
                  className="flex-1 py-1.5 rounded-full font-bold text-center"
                  style={{
                    background: active ? "#E8A93D" : "#3A2C42",
                    color: active ? "#241623" : "#C9BBB0",
                    fontSize: "11px",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {tab === "now" && (
            <div className="mt-4 rounded-xl p-3" style={{ background: "#3A2C42" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#E8A93D" }}>
                  <Zap size={13} /> {nowLabel}
                </span>
                {customNowStr && (
                  <button onClick={() => setCustomNowStr(null)} className="flex items-center gap-1" style={{ color: "#C9BBB0", fontSize: "10px" }}>
                    <RotateCcw size={11} /> חזרה לזמן אמת
                  </button>
                )}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setCustomNowStr(p.value)}
                    className="px-2 py-1 rounded-full font-bold"
                    style={{
                      background: customNowStr === p.value ? "#E8A93D" : "#4A3A54",
                      color: customNowStr === p.value ? "#241623" : "#EDE3D0",
                      fontSize: "10px",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ background: "#FBF3E6" }}>
          {tab === "program" && (
            <div className="pb-6">
              {currentVenueOrder.filter((v) => dayEventsByVenue[v]).map((venueId) => (
                <div key={venueId}>
                  <div
                    className="sticky top-0 z-10 px-5 py-2 flex items-center gap-2 backdrop-blur"
                    style={{ background: "#FBF3E6EE", borderBottom: `2px solid ${dayColor}22` }}
                  >
                    <span
                      className="font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: dayColor, color: "#FBF3E6", fontSize: "10px" }}
                    >
                      {DAY_META[selectedDate].weekday} · {DAY_META[selectedDate].label}
                    </span>
                    <Building2 size={14} color={dayColor} className="flex-shrink-0" />
                    <h2 className="text-sm font-bold truncate" style={{ color: "#241623" }}>
                      {VENUES[venueId]?.name}
                    </h2>
                  </div>
                  <div className="px-5 py-3 flex flex-col gap-3">
                    {dayEventsByVenue[venueId].map((ev) => (
                      <EventCard key={ev.id} ev={ev} dayColor={dayColor} isSaved={!!saved[ev.id]} onToggle={toggleSave} />
                    ))}
                  </div>
                </div>
              ))}
              {!Object.keys(dayEventsByVenue).length && (
                <div className="px-5 py-16 text-center" style={{ color: "#8A7B84" }}>
                  {catFilter === "all"
                    ? "אין אירועים רשומים ליום זה עדיין."
                    : `אין אירועי "${catFilter === "show" ? "מופעים" : "הרקדות"}" ביום זה. נסי את "כלל האירועים".`}
                </div>
              )}
            </div>
          )}

          {tab === "now" && (
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full pop-anim" style={{ background: "#C81D3E" }} />
                <h2 className="text-sm font-bold" style={{ color: "#241623" }}>קורה עכשיו</h2>
              </div>
              {liveNow.length === 0 ? (
                <div className="rounded-xl p-4 mb-5 text-center text-xs" style={{ background: "#F3ECDF", color: "#8A7B84" }}>
                  אין אירוע פעיל כרגע בשעה הזו. בדקי את "בקרוב" למטה, או נסי אחד מכפתורי הזמן למעלה.
                </div>
              ) : (
                <div className="flex flex-col gap-3 mb-5">
                  {liveNow.map((ev) => (
                    <EventCard key={ev.id} ev={ev} isSaved={!!saved[ev.id]} onToggle={toggleSave} isLive />
                  ))}
                </div>
              )}

              <h2 className="text-sm font-bold mb-2" style={{ color: "#241623" }}>בקרוב</h2>
              {upcoming.length === 0 ? (
                <div className="rounded-xl p-4 text-center text-xs" style={{ background: "#F3ECDF", color: "#8A7B84" }}>
                  אין עוד אירועים אחרי הרגע הזה בפסטיבל.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {upcoming.map((ev) => (
                    <EventCard key={ev.id} ev={ev} isSaved={!!saved[ev.id]} onToggle={toggleSave} showDate />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "myschedule" && (
            <div className="px-5 py-4">
              {savedList.length === 0 ? (
                <div className="flex flex-col items-center text-center mt-16 gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#F3ECDF" }}>
                    <Heart size={26} color="#B0A296" />
                  </div>
                  <p className="font-bold" style={{ color: "#241623" }}>הלו"ז שלך עוד ריק</p>
                  <p className="text-xs" style={{ color: "#8A7B84", maxWidth: "220px" }}>
                    עברי לתוכנייה ולחצי על הלב ליד כל אירוע שמעניין אותך — הוא יופיע כאן.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={async () => {
                        const text = buildShareText(savedList, notes);
                        const ok = await copyToClipboard(text);
                        if (ok) {
                          showToast("הלו\"ז הועתק - אפשר להדביק בוואטסאפ");
                        } else {
                          setShareFallback(text);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
                      style={{ background: "#241623", color: "#FBF3E6" }}
                    >
                      <Share2 size={15} /> שיתוף הלו"ז
                    </button>
                  </div>

                  {DATES.filter((d) => savedList.some((e) => e.date === d)).map((d) => (
                    <div key={d} className="mb-4">
                      <p className="text-xs font-bold mb-2" style={{ color: DAY_META[d].color }}>
                        {DAY_META[d].weekday} · {DAY_META[d].label}
                      </p>
                      <div className="flex flex-col gap-2">
                        {savedList.filter((e) => e.date === d).map((ev) => (
                          <EventCard key={ev.id} ev={ev} isSaved onToggle={toggleSave} removeMode>
                            <div className="flex items-center gap-1.5 pt-1" style={{ borderTop: "1px dashed #EEE3D3" }}>
                              <Pencil size={11} color="#B0A296" className="flex-shrink-0" />
                              <input
                                type="text"
                                value={notes[ev.id] || ""}
                                onChange={(e) => updateNote(ev.id, e.target.value)}
                                placeholder="הוסיפי הערה אישית, למשל: זוגות עם מיכל"
                                className="flex-1 bg-transparent outline-none"
                                style={{ color: "#4A3A44", fontSize: "12px" }}
                              />
                            </div>
                          </EventCard>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {tab === "venues" && (
            <div className="px-5 py-4 flex flex-col gap-3">
              {ALL_VENUE_ORDER.filter((v) => VENUES[v]).map((v) => (
                <div key={v} className="rounded-xl p-4" style={{ background: "#FFFFFF", boxShadow: "0 1px 3px rgba(36,22,35,0.08)" }}>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} color="#C81D3E" className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#241623" }}>{VENUES[v].name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8A7B84" }}>{VENUES[v].address}</p>
                      {VENUES[v].notes && <p className="mt-1" style={{ color: "#B0A296", fontSize: "11px" }}>{VENUES[v].notes}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="px-5 py-4">
              <div className="rounded-xl p-4 text-center" style={{ background: "#241623" }}>
                <Heart size={16} color="#E8A93D" fill="#E8A93D" className="mx-auto mb-2" />
                <p className="leading-relaxed" style={{ color: "#EDE3D0", fontSize: "12px" }}>
                  האפליקציה נבנתה באהבה ובהתבסס על המידע שפורסם לציבור על פסטיבל אשדודאנס.
                  היא מוגשת ללא עלות, לנוחות חבריי וחברותיי וכל מי שמעוניין להשתמש בה.
                  ייתכנו שינויים או אי־דיוקים, ולכן מומלץ להתעדכן גם בפרסומים הרשמיים של הפסטיבל.
                </p>
                <p className="mt-2" style={{ color: "#C9BBB0", fontSize: "11px" }}>
                  למידע נוסף: אלי שבמנאו ·{" "}
                  <a href="mailto:ELI.S@ESAC-SMART.CO.IL" style={{ color: "#E8A93D", textDecoration: "underline" }}>
                    ELI.S@ESAC-SMART.CO.IL
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Floating "My Schedule" button */}
        {tab !== "myschedule" && (
          <button
            onClick={() => setTab("myschedule")}
            className="absolute bottom-24 left-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-30"
            style={{ background: "#E8A93D" }}
            aria-label="הלו״ז שלי"
          >
            <Heart size={22} color="#241623" fill="#241623" />
            {savedList.length > 0 && (
              <span
                className="absolute -top-1 -right-1 px-1 rounded-full flex items-center justify-center font-bold"
                style={{ background: "#C81D3E", color: "#FBF3E6", minWidth: "20px", height: "20px", fontSize: "11px" }}
              >
                {savedList.length}
              </span>
            )}
          </button>
        )}

        {/* Toast */}
        {toast && (
          <div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            style={{ background: "#241623", color: "#FBF3E6" }}
          >
            {toast}
          </div>
        )}

        {/* Manual-copy fallback modal - shown when both the Clipboard API and the
            execCommand fallback fail (can happen in some embedded/sandboxed viewers) */}
        {shareFallback && (
          <div
            className="absolute inset-0 z-40 flex items-center justify-center p-5"
            style={{ background: "#241623CC" }}
            onClick={() => setShareFallback(null)}
          >
            <div
              className="w-full rounded-2xl p-4"
              style={{ background: "#FBF3E6" }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bold mb-1" style={{ color: "#241623", fontSize: "13px" }}>
                ההעתקה האוטומטית לא זמינה כאן
              </p>
              <p className="mb-2" style={{ color: "#6B5B63", fontSize: "11px" }}>
                סמני את הטקסט למטה והעתיקי אותו ידנית (לחיצה ארוכה → העתק):
              </p>
              <textarea
                readOnly
                value={shareFallback}
                onFocus={(e) => e.target.select()}
                className="w-full rounded-xl p-2 outline-none"
                style={{ background: "#FFFFFF", color: "#241623", fontSize: "12px", height: "220px", border: "1px solid #E3D9C8", direction: "rtl" }}
              />
              <button
                onClick={() => setShareFallback(null)}
                className="w-full mt-3 py-2 rounded-xl font-bold"
                style={{ background: "#241623", color: "#FBF3E6", fontSize: "12px" }}
              >
                סגירה
              </button>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div className="flex-shrink-0 flex justify-around items-center py-2 px-1" style={{ background: "#FFFFFF", borderTop: "1px solid #EEE3D3" }}>
          {[
            { key: "program", label: "תוכנייה", icon: Calendar },
            { key: "now", label: "עכשיו", icon: Zap },
            { key: "venues", label: "אולמות", icon: Building2 },
            { key: "about", label: "אודות", icon: Info },
          ].map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl"
                style={{ color: active ? "#C81D3E" : "#B0A296" }}
              >
                <Icon size={18} />
                <span className="font-bold" style={{ fontSize: "10px" }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
