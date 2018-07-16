import { processColor } from 'react-native';
import Color from 'color';
import { action, computed, extendObservable, observable } from 'mobx';
import { Colors, Config } from '../../src/global';
import { ChartUtil } from '../../src/utils';

const testTimes1 = JSON.parse('["2018-02-22 07:00:00","2018-02-22 07:01:00","2018-02-22 07:02:00","2018-02-22 07:03:00","2018-02-22 07:04:00","2018-02-22 07:05:00","2018-02-22 07:06:00","2018-02-22 07:07:00","2018-02-22 07:08:00","2018-02-22 07:09:00","2018-02-22 07:10:00","2018-02-22 07:11:00","2018-02-22 07:12:00","2018-02-22 07:13:00","2018-02-22 07:14:00","2018-02-22 07:15:00","2018-02-22 07:16:00","2018-02-22 07:17:00","2018-02-22 07:18:00","2018-02-22 07:19:00","2018-02-22 07:20:00","2018-02-22 07:21:00","2018-02-22 07:22:00","2018-02-22 07:23:00","2018-02-22 07:24:00","2018-02-22 07:25:00","2018-02-22 07:26:00","2018-02-22 07:27:00","2018-02-22 07:28:00","2018-02-22 07:29:00","2018-02-22 07:30:00","2018-02-22 07:31:00","2018-02-22 07:32:00","2018-02-22 07:33:00","2018-02-22 07:34:00","2018-02-22 07:35:00","2018-02-22 07:36:00","2018-02-22 07:37:00","2018-02-22 07:38:00","2018-02-22 07:39:00","2018-02-22 07:40:00","2018-02-22 07:41:00","2018-02-22 07:42:00","2018-02-22 07:43:00","2018-02-22 07:44:00","2018-02-22 07:45:00","2018-02-22 07:46:00","2018-02-22 07:47:00","2018-02-22 07:48:00","2018-02-22 07:49:00","2018-02-22 07:50:00","2018-02-22 07:51:00","2018-02-22 07:52:00","2018-02-22 07:53:00","2018-02-22 07:54:00","2018-02-22 07:55:00","2018-02-22 07:56:00","2018-02-22 07:57:00","2018-02-22 07:58:00","2018-02-22 07:59:00","2018-02-22 08:00:00","2018-02-22 08:01:00","2018-02-22 08:02:00","2018-02-22 08:03:00","2018-02-22 08:04:00","2018-02-22 08:05:00","2018-02-22 08:06:00","2018-02-22 08:07:00","2018-02-22 08:08:00","2018-02-22 08:09:00","2018-02-22 08:10:00","2018-02-22 08:11:00","2018-02-22 08:12:00","2018-02-22 08:13:00","2018-02-22 08:14:00","2018-02-22 08:15:00","2018-02-22 08:16:00","2018-02-22 08:17:00","2018-02-22 08:18:00","2018-02-22 08:19:00","2018-02-22 08:20:00","2018-02-22 08:21:00","2018-02-22 08:22:00","2018-02-22 08:23:00","2018-02-22 08:24:00","2018-02-22 08:25:00","2018-02-22 08:26:00","2018-02-22 08:27:00","2018-02-22 08:28:00","2018-02-22 08:29:00","2018-02-22 08:30:00","2018-02-22 08:31:00","2018-02-22 08:32:00","2018-02-22 08:33:00","2018-02-22 08:34:00","2018-02-22 08:35:00","2018-02-22 08:36:00","2018-02-22 08:37:00","2018-02-22 08:38:00","2018-02-22 08:39:00","2018-02-22 08:40:00","2018-02-22 08:41:00","2018-02-22 08:42:00","2018-02-22 08:43:00","2018-02-22 08:44:00","2018-02-22 08:45:00","2018-02-22 08:46:00","2018-02-22 08:47:00","2018-02-22 08:48:00","2018-02-22 08:49:00","2018-02-22 08:50:00","2018-02-22 08:51:00","2018-02-22 08:52:00","2018-02-22 08:53:00","2018-02-22 08:54:00","2018-02-22 08:55:00","2018-02-22 08:56:00","2018-02-22 08:57:00","2018-02-22 08:58:00","2018-02-22 08:59:00","2018-02-22 09:00:00","2018-02-22 09:01:00","2018-02-22 09:02:00","2018-02-22 09:03:00","2018-02-22 09:04:00","2018-02-22 09:05:00","2018-02-22 09:06:00","2018-02-22 09:07:00","2018-02-22 09:08:00","2018-02-22 09:09:00","2018-02-22 09:10:00","2018-02-22 09:11:00","2018-02-22 09:12:00","2018-02-22 09:13:00","2018-02-22 09:14:00","2018-02-22 09:15:00","2018-02-22 09:16:00","2018-02-22 09:17:00","2018-02-22 09:18:00","2018-02-22 09:19:00","2018-02-22 09:20:00","2018-02-22 09:21:00","2018-02-22 09:22:00","2018-02-22 09:23:00","2018-02-22 09:24:00","2018-02-22 09:25:00","2018-02-22 09:26:00","2018-02-22 09:27:00","2018-02-22 09:28:00","2018-02-22 09:29:00","2018-02-22 09:30:00","2018-02-22 09:31:00","2018-02-22 09:32:00","2018-02-22 09:33:00","2018-02-22 09:34:00","2018-02-22 09:35:00","2018-02-22 09:36:00","2018-02-22 09:37:00","2018-02-22 09:38:00","2018-02-22 09:39:00","2018-02-22 09:40:00","2018-02-22 09:41:00","2018-02-22 09:42:00","2018-02-22 09:43:00","2018-02-22 09:44:00","2018-02-22 09:45:00","2018-02-22 09:46:00","2018-02-22 09:47:00","2018-02-22 09:48:00","2018-02-22 09:49:00","2018-02-22 09:50:00","2018-02-22 09:51:00","2018-02-22 09:52:00","2018-02-22 09:53:00","2018-02-22 09:54:00","2018-02-22 09:55:00","2018-02-22 09:56:00","2018-02-22 09:57:00","2018-02-22 09:58:00","2018-02-22 09:59:00","2018-02-22 10:00:00","2018-02-22 10:01:00","2018-02-22 10:02:00","2018-02-22 10:03:00","2018-02-22 10:04:00","2018-02-22 10:05:00","2018-02-22 10:06:00","2018-02-22 10:07:00","2018-02-22 10:08:00","2018-02-22 10:09:00","2018-02-22 10:10:00","2018-02-22 10:11:00","2018-02-22 10:12:00","2018-02-22 10:13:00","2018-02-22 10:14:00","2018-02-22 10:15:00","2018-02-22 10:16:00","2018-02-22 10:17:00","2018-02-22 10:18:00","2018-02-22 10:19:00","2018-02-22 10:20:00","2018-02-22 10:21:00","2018-02-22 10:22:00","2018-02-22 10:23:00","2018-02-22 10:24:00","2018-02-22 10:25:00","2018-02-22 10:26:00","2018-02-22 10:27:00","2018-02-22 10:28:00","2018-02-22 10:29:00","2018-02-22 10:30:00","2018-02-22 10:31:00","2018-02-22 10:32:00","2018-02-22 10:33:00","2018-02-22 10:34:00","2018-02-22 10:35:00","2018-02-22 10:36:00","2018-02-22 10:37:00","2018-02-22 10:38:00","2018-02-22 10:39:00","2018-02-22 10:40:00","2018-02-22 10:41:00","2018-02-22 10:42:00","2018-02-22 10:43:00","2018-02-22 10:44:00","2018-02-22 10:45:00","2018-02-22 10:46:00","2018-02-22 10:47:00","2018-02-22 10:48:00","2018-02-22 10:49:00","2018-02-22 10:50:00","2018-02-22 10:51:00","2018-02-22 10:52:00","2018-02-22 10:53:00","2018-02-22 10:54:00","2018-02-22 10:55:00","2018-02-22 10:56:00","2018-02-22 10:57:00","2018-02-22 10:58:00","2018-02-22 10:59:00","2018-02-22 11:00:00","2018-02-22 11:01:00","2018-02-22 11:02:00","2018-02-22 11:03:00","2018-02-22 11:04:00","2018-02-22 11:05:00","2018-02-22 11:06:00","2018-02-22 11:07:00","2018-02-22 11:08:00","2018-02-22 11:09:00","2018-02-22 11:10:00","2018-02-22 11:11:00","2018-02-22 11:12:00","2018-02-22 11:13:00","2018-02-22 11:14:00","2018-02-22 11:15:00","2018-02-22 11:16:00","2018-02-22 11:17:00","2018-02-22 11:18:00","2018-02-22 11:19:00","2018-02-22 11:20:00","2018-02-22 11:21:00","2018-02-22 11:22:00","2018-02-22 11:23:00","2018-02-22 11:24:00","2018-02-22 11:25:00","2018-02-22 11:26:00","2018-02-22 11:27:00","2018-02-22 11:28:00","2018-02-22 11:29:00","2018-02-22 11:30:00","2018-02-22 11:31:00","2018-02-22 11:32:00","2018-02-22 11:33:00","2018-02-22 11:34:00","2018-02-22 11:35:00","2018-02-22 11:36:00","2018-02-22 11:37:00","2018-02-22 11:38:00","2018-02-22 11:39:00","2018-02-22 11:40:00","2018-02-22 11:41:00","2018-02-22 11:42:00","2018-02-22 11:43:00","2018-02-22 11:44:00","2018-02-22 11:45:00","2018-02-22 11:46:00","2018-02-22 11:47:00","2018-02-22 11:48:00","2018-02-22 11:49:00","2018-02-22 11:50:00","2018-02-22 11:51:00","2018-02-22 11:52:00","2018-02-22 11:53:00","2018-02-22 11:54:00","2018-02-22 11:55:00","2018-02-22 11:56:00","2018-02-22 11:57:00","2018-02-22 11:58:00","2018-02-22 11:59:00","2018-02-22 12:00:00","2018-02-22 12:01:00","2018-02-22 12:02:00","2018-02-22 12:03:00","2018-02-22 12:04:00","2018-02-22 12:05:00","2018-02-22 12:06:00","2018-02-22 12:07:00","2018-02-22 12:08:00","2018-02-22 12:09:00","2018-02-22 12:10:00","2018-02-22 12:11:00","2018-02-22 12:12:00","2018-02-22 12:13:00","2018-02-22 12:14:00","2018-02-22 12:15:00","2018-02-22 12:16:00","2018-02-22 12:17:00","2018-02-22 12:18:00","2018-02-22 12:19:00","2018-02-22 12:20:00","2018-02-22 12:21:00","2018-02-22 12:22:00","2018-02-22 12:23:00","2018-02-22 12:24:00","2018-02-22 12:25:00","2018-02-22 12:26:00","2018-02-22 12:27:00","2018-02-22 12:28:00","2018-02-22 12:29:00"]');
const testTimeLabels1 = JSON.parse('["07 : 00","07 : 01","07 : 02","07 : 03","07 : 04","07 : 05","07 : 06","07 : 07","07 : 08","07 : 09","07 : 10","07 : 11","07 : 12","07 : 13","07 : 14","07 : 15","07 : 16","07 : 17","07 : 18","07 : 19","07 : 20","07 : 21","07 : 22","07 : 23","07 : 24","07 : 25","07 : 26","07 : 27","07 : 28","07 : 29","07 : 30","07 : 31","07 : 32","07 : 33","07 : 34","07 : 35","07 : 36","07 : 37","07 : 38","07 : 39","07 : 40","07 : 41","07 : 42","07 : 43","07 : 44","07 : 45","07 : 46","07 : 47","07 : 48","07 : 49","07 : 50","07 : 51","07 : 52","07 : 53","07 : 54","07 : 55","07 : 56","07 : 57","07 : 58","07 : 59","08 : 00","08 : 01","08 : 02","08 : 03","08 : 04","08 : 05","08 : 06","08 : 07","08 : 08","08 : 09","08 : 10","08 : 11","08 : 12","08 : 13","08 : 14","08 : 15","08 : 16","08 : 17","08 : 18","08 : 19","08 : 20","08 : 21","08 : 22","08 : 23","08 : 24","08 : 25","08 : 26","08 : 27","08 : 28","08 : 29","08 : 30","08 : 31","08 : 32","08 : 33","08 : 34","08 : 35","08 : 36","08 : 37","08 : 38","08 : 39","08 : 40","08 : 41","08 : 42","08 : 43","08 : 44","08 : 45","08 : 46","08 : 47","08 : 48","08 : 49","08 : 50","08 : 51","08 : 52","08 : 53","08 : 54","08 : 55","08 : 56","08 : 57","08 : 58","08 : 59","09 : 00","09 : 01","09 : 02","09 : 03","09 : 04","09 : 05","09 : 06","09 : 07","09 : 08","09 : 09","09 : 10","09 : 11","09 : 12","09 : 13","09 : 14","09 : 15","09 : 16","09 : 17","09 : 18","09 : 19","09 : 20","09 : 21","09 : 22","09 : 23","09 : 24","09 : 25","09 : 26","09 : 27","09 : 28","09 : 29","09 : 30","09 : 31","09 : 32","09 : 33","09 : 34","09 : 35","09 : 36","09 : 37","09 : 38","09 : 39","09 : 40","09 : 41","09 : 42","09 : 43","09 : 44","09 : 45","09 : 46","09 : 47","09 : 48","09 : 49","09 : 50","09 : 51","09 : 52","09 : 53","09 : 54","09 : 55","09 : 56","09 : 57","09 : 58","09 : 59","10 : 00","10 : 01","10 : 02","10 : 03","10 : 04","10 : 05","10 : 06","10 : 07","10 : 08","10 : 09","10 : 10","10 : 11","10 : 12","10 : 13","10 : 14","10 : 15","10 : 16","10 : 17","10 : 18","10 : 19","10 : 20","10 : 21","10 : 22","10 : 23","10 : 24","10 : 25","10 : 26","10 : 27","10 : 28","10 : 29","10 : 30","10 : 31","10 : 32","10 : 33","10 : 34","10 : 35","10 : 36","10 : 37","10 : 38","10 : 39","10 : 40","10 : 41","10 : 42","10 : 43","10 : 44","10 : 45","10 : 46","10 : 47","10 : 48","10 : 49","10 : 50","10 : 51","10 : 52","10 : 53","10 : 54","10 : 55","10 : 56","10 : 57","10 : 58","10 : 59","11 : 00","11 : 01","11 : 02","11 : 03","11 : 04","11 : 05","11 : 06","11 : 07","11 : 08","11 : 09","11 : 10","11 : 11","11 : 12","11 : 13","11 : 14","11 : 15","11 : 16","11 : 17","11 : 18","11 : 19","11 : 20","11 : 21","11 : 22","11 : 23","11 : 24","11 : 25","11 : 26","11 : 27","11 : 28","11 : 29","11 : 30","11 : 31","11 : 32","11 : 33","11 : 34","11 : 35","11 : 36","11 : 37","11 : 38","11 : 39","11 : 40","11 : 41","11 : 42","11 : 43","11 : 44","11 : 45","11 : 46","11 : 47","11 : 48","11 : 49","11 : 50","11 : 51","11 : 52","11 : 53","11 : 54","11 : 55","11 : 56","11 : 57","11 : 58","11 : 59","12 : 00","12 : 01","12 : 02","12 : 03","12 : 04","12 : 05","12 : 06","12 : 07","12 : 08","12 : 09","12 : 10","12 : 11","12 : 12","12 : 13","12 : 14","12 : 15","12 : 16","12 : 17","12 : 18","12 : 19","12 : 20","12 : 21","12 : 22","12 : 23","12 : 24","12 : 25","12 : 26","12 : 27","12 : 28","12 : 29"]');
const testPrices1 = JSON.parse('[1326.9,1326.5,1326.4,1326.7,1326.6,1326.6,1326.7,1326.8,1326.5,1326.8,1326.7,1326.5,1326.5,1326.7,1326.8,1326.8,1327.3,1327.2,1327.3,1327.3,1327.3,1327.4,1327.5,1327.6,1327.5,1327.2,1327.2,1327.4,1327.9,1327.8,1327.5,1327.7,1327.7,1327.7,1327.9,1327.7,1327.7,1327.7,1327.6,1327.7,1327.9,1328.3,1328.4,1328.4,1328.2,1328.5,1328.3,1328.4,1328.3,1328.3,1328.3,1328.5,1328.6,1328.8,1328.8,1328.6,1328.1,1328.5,1328.9,1328.8,1328.4,1328.5,1328.3,1327.9,1327.8,1327.4,1327.4,1327.6,1327.6,1327.2,1327.6,1327.7,1327.5,1327.2,1327.3,1327.4,1327.3,1327.2,1327.1,1327,1327.1,1327.3,1327.3,1327.4,1327.4,1327.4,1327,1327.1,1327,1327.2,1327.3,1327.3,1327.4,1327.7,1327.6,1327.6,1327.6,1327.6,1327.6,1327.3,1327.5,1327.5,1327.4,1327.5,1328,1328.2,1328.2,1328.1,1328.3,1328.1,1328.1,1328.3,1328.2,1327.9,1328.1,1328.3,1328.5,1328.1,1328.1,1328.3,1328.1,1326.7,1327.1,1326.8,1326.2,1325.8,1325.4,1326,1325.8,1325.4,1326,1325.7,1326.4,1326.5,1326.6,1326.5,1325.9,1325.5,1325.8,1325.6,1325.8,1325.8,1326.1,1326.3,1326.1,1326.1,1325.9,1326,1326.7,1327,1326.9,1326.8,1327.2,1327,1327.9,1327.8,1327.7,1327.4,1327.2,1327.6,1327.2,1327.5,1327.6,1327.2,1327.4,1327.4,1327.1,1327.1,1326.9,1326.8,1326.2,1326.1,1326.4,1326.6,1326.8,1326.6,1327,1326.7,1326.7,1326.8,1326.5,1326.8,1327,1327.1,1326.8,1326.5,1326.7,1326.7,1326.9,1326.7,1326.5,1326.7,1326.7,1326.7,1326.6,1326.4,1326.2,1326.3,1326.2,1325.8,1326.2,1326.3,1326.2,1326.2,1326.2,1326.2,1326.2,1326.1,1326.2,1326.3,1326.2,1326.2,1326.2,1325.8,1325.5,1325.7,1326,1325.8,1325.7,1325.7,1325.8,1326.2,1326.2,1325.9,1326,1326.3,1326.4,1326.2,1326.1,1326,1325.9,1325.9,1326.1,1326.3,1326,1326,1326,1325.8,1325.9,1325.8,1325.8,1325.8,1326,1326,1326,1326,1326.2,1326.3,1326.3,1326.1,1326.1,1326.2,1326.3,1326.3,1326.4,1326.5,1326.3,1326.3,1326.1,1326.1,1326.2,1326.2,1326.2,1326.1,1326.2,1326.2,1326.1,1326.2,1326.4,1326.4,1326.3,1326.4,1326.5,1326.3,1326.2,1326.2,1325.8,1325.8,1326,1326.1,1326,1326.1,1326,1326.1,1325.9,1326,1326,1325.8,1325.8,1325.8,1325.8,1325.9,1326,1325.9,1325.7,1325.7,1325.7,1325.6,1325.8,1325.9,1325.8,1325.9,1325.8,1325.7,1325.8,1325.9,1326,1325.9,1325.9,1326.1,1326.1,1326.1,1326.1,1326.3,1326.2,1326.2,1326.2,1326.3,1326.1,1325.9,1325.9,1325.8,1325.8,1325.8,1325.6,1325.7,1325.8,1325.7,1325.8,1325.8]');
const testVolumns1 = JSON.parse('[247,102,51,54,31,41,43,39,14,33,45,62,8,10,22,18,52,30,22,30,33,37,79,35,40,47,19,17,54,33,65,18,10,34,62,10,8,12,8,6,20,73,100,29,19,81,43,26,4,20,36,31,27,98,23,45,49,25,160,85,73,48,66,112,95,113,77,50,40,93,65,88,31,101,47,26,19,44,64,110,81,45,54,30,18,1,72,30,18,42,8,19,16,53,11,37,37,28,365,15,138,23,39,79,110,315,91,93,138,120,56,43,89,64,112,120,170,131,65,99,400,393,233,375,337,255,326,317,59,252,185,85,71,149,75,250,168,228,192,171,138,73,113,43,31,26,118,96,215,399,227,148,91,80,240,264,76,164,135,117,57,190,85,159,18,38,280,129,320,105,306,98,95,165,200,69,175,52,60,201,205,108,49,42,129,85,86,107,31,179,104,35,113,76,85,80,65,54,181,206,142,75,10,46,40,46,66,44,43,9,51,24,19,84,1547,111,256,68,109,42,62,113,79,101,65,64,33,45,102,38,29,202,70,70,22,41,11,94,23,77,56,34,24,55,24,38,51,92,41,58,32,25,15,31,104,110,33,47,152,29,102,39,25,21,31,62,63,48,21,9,55,18,69,76,97,14,246,101,39,36,13,8,14,10,33,43,12,68,37,17,2,21,67,19,42,40,193,63,38,50,19,25,39,28,19,37,20,24,0,77,2,34,7,74,8,90,44,65,32,48,21,20,23,59,20,15,46,12,66,4]');

export default class TestTimeLineStore {
    constructor() {
        this.reset();
        this.startShining();
    }
    startShining() {
        setInterval(() => {
            this.isShining = !this.isShining;
        }, 1000);
    }
    @observable isShining = false;
    @action reset() {
        extendObservable(this, {
            data: {
                times: testTimes1,              // 為了add()，比較更新資料 - string - 2017-09-01 10:30:00 
                timeLabels: testTimeLabels1,    // xAxix 分鐘 - 16:22   -> add lastPrices1
                prices: testPrices1,            // LineChart -yAxis    -> add lastPrices1
                volumns: testVolumns1           // BarChart - yAxis    -> add freshVolume
            },
            // isLoading: false,
            xIndexSelected: null // null 時 Marker - 當touch DisplayModal時, 再將xIndexSelected設為null, Marker就消失
        });
        this.dotSize = null;
        this.totalVolumn = null;
        this.isReady = 0;
        this.totalVolumn = null;    // 紀錄最新的TotalVolumn
        this.preSettlePrice = null; // 昨日結算價 - 也就是 - 今日開盤價
    }
    @computed get lineXAxis() {
        return { 
            valueFormatter: this.data.timeLabels.slice(),
            granularityEnabled: true,
            granularity: 1,
            textColor: processColor(Colors.white), // x軸的字樣
            
            enabled: false,
            position: 'BOTTOM',
            drawHighlightIndicators: false,
            drawGridLines: false,                   // 不畫格線
            drawAxisLine: false,                    // 不畫X Y 軸線
        };
    }
    getRealLineDataSet() {
        const lineArr = this.data.prices.map((price) => {
            return { y: price };
        });
        return {
            values: lineArr,
            label: '',
            config: {
                // 是否畫圖
                visible: true,
                lineWidth: 1,
                drawCubicIntensity: 0.4,
                // line color
                color: processColor(Colors.lighteningLineColor),
                // fill color
                drawFilled: true,
                fillColor: processColor(Colors.lighteningLineColor),
                fillAlpha: 50,
                // circle settings
                drawCircles: false,
                // value setting 是否顯示該點表示的值
                drawValues: false,
                // valueTextColor: processColor('white'),
                // valueTextSize: 14,
                drawHighlightIndicators: false,
            }
        };
    }
    getCircleLatestDataSet() {
         // 我只要取最新一點畫圓
         const lastIndex = this.data.prices.length - 1;
         let latestPrice = 0;
         const circleArr = this.data.prices.map((price, index) => {
             if (index === lastIndex) { 
                 latestPrice = price;
                 return { y: latestPrice };
             }
             return null;
         });
         // 並計算一點的顏色
         // 1. 用最新價計算 - 先保留 可能會再改回去
         // let latestCircleColor = Colors.lighteningLineColor;
         // if (this.preSettlePrice !== null) {
         //     // 如果最新价>当天的最高价，同时有行情变化的时候，圆点以红色闪动
         //     if (latestPrice > this.preSettlePrice) {
         //         latestCircleColor = Colors.red;
         //     } else {
         //         // 如果最新价<当天的最低价，同时有行情变化的时候，圆点以绿色闪动
         //         latestCircleColor = Colors.green;
         //     }
         // }
         // 2. 最新的一點，和前一點做比較
         const lastSecondPrice = this.data.prices[this.data.prices.length - 2];
         let latestCircleColor = Colors.lighteningLineColor;
         // 最新價 > 上一點的價錢，圆点以红色闪动
         if (latestPrice > lastSecondPrice) {
             latestCircleColor = Color(Colors.red);
         } else {
             // 最新價 > 上一點的價錢，圆点以绿色闪动
             latestCircleColor = Color(Colors.green);
         }
         return {
            values: circleArr,
            label: '',
            config: {
                // 是否畫圖
                visible: true,
                // line color
                // color: processColor(latestCircleColor),
                // fill color
                drawFilled: false,
                // circle settings
                drawCircles: true,
                circleRadius: this.isShining ? 10 : 5,
                circleColor: processColor(this.isShining ? latestCircleColor.lighten(1).alpha(0.3) : latestCircleColor.string()),
                circleHoleColor: processColor(latestCircleColor.string()),
                // value setting 是否顯示該點表示的值
                drawValues: true,
                valueTextColor: processColor('white'),
                valueTextSize: 14,
                valueFormatter: '',
                drawHighlightIndicators: false
            }
        };
    }
    @computed get lineData() {
        return {
            dataSets: [this.getRealLineDataSet(), this.getCircleLatestDataSet(), ChartUtil.getLastestLineDataSet(this.data.prices)]
            // dataSets: [this.getRealLineDataSet(), this.getCircleLatestDataSet()]
        };
    }
    @computed get barXAxis() {
        return { 
            valueFormatter: this.data.timeLabels.slice(),
            granularityEnabled: true,
            granularity: 1,
            
            enabled: true,
            textColor: processColor(Colors.white),
            position: 'TOP',

            drawGridLines: false,               // 不畫格線
            drawAxisLine: false,                // 不畫X Y 軸線
        };
    }
    @computed get barData() {
        const valuesArr = this.data.volumns.map((volumn) => {
            return { y: volumn };
        });
        // 因為getLastestLineDataSet，因此bar也要加入一樣的空值
        ChartUtil.setNumOfLastestLine(valuesArr, 0);
        return {
                dataSets: [
                    {
                        // values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
                        values: valuesArr,
                        label: '',
                        config: {
                            color: processColor(Colors.barColor),
                            drawValues: false,
                            valueFormatter: '##.00',
                            // axisDependency: 'RIGHT',
                            //   barSpacePercent: 40,
                            //   barShadowColor: processColor('lightgrey'),
                            //   highlightAlpha: 90,
                            //   highlightColor: processColor('red'),
                        }
                    }
                ]
        };
    }
    yAxis = {
        left: {
            enabled: false
        },
        right: {
            valueFormatter: '##.0',
            textColor: processColor(Colors.white), // y軸的字樣
            // position: 'INSIDE_CHART',               // y軸顯示在內側
            drawGridLines: false,
            drawAxisLine: false,
            // valueFormatter: '##.0',
        }
    }
    setting = {
        legend: {
            enabled: false
        },
        marker: {
            enabled: false
        }
    }
    @computed get selectedData() {
        // 第二個判斷是，多加上了LastestLine畫最新點的延伸線，此時資料不存在，也不需要顯示marker
        if (!this.xIndexSelected || (this.xIndexSelected >= this.data.timeLabels.length)) {
            return null;
        }
        return {
            timeLabel: `${this.data.timeLabels[this.xIndexSelected]}`, //10:30
            price: this.data.prices[this.xIndexSelected],
            volumn: this.data.volumns[this.xIndexSelected]
        };
    }
    @action handleSelect(entry) {
        this.xIndexSelected = entry.x;
    }
    @action hideMarker() {
        this.xIndexSelected = null;
    }
}
