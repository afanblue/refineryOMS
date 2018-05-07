-- MySQL dump 10.13  Distrib 5.5.59, for Win64 (AMD64)
--
-- Host: localhost    Database: oms
-- ------------------------------------------------------
-- Server version	5.5.59-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `active_vw`
--

DROP TABLE IF EXISTS `active_vw`;
/*!50001 DROP VIEW IF EXISTS `active_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `active_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alarm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alarm_type_id` int(11) NOT NULL COMMENT 'type of alarm',
  `tag_type_id` int(11) NOT NULL COMMENT 'type of obj being alarmed',
  `tag_id` int(11) NOT NULL COMMENT 'id of object being alarmed',
  `alm_occurred` datetime DEFAULT NULL,
  `acknowledged` char(1) DEFAULT 'N',
  `active` char(1) DEFAULT 'Y',
  `alarm_msg_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alm_typ_id_fk` (`alarm_type_id`),
  KEY `alm_msg_id_fk` (`alarm_msg_id`),
  KEY `alarm_tag_fk_idx` (`tag_id`),
  CONSTRAINT `alarm_ibfk_1` FOREIGN KEY (`alarm_type_id`) REFERENCES `alarm_type` (`id`),
  CONSTRAINT `alarm_ibfk_2` FOREIGN KEY (`alarm_msg_id`) REFERENCES `alarm_message` (`id`),
  CONSTRAINT `alarm_tag_fk` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER alm_bi_trg BEFORE INSERT ON alarm for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER alm_bu_trg BEFORE UPDATE ON alarm for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `alarm_color_list_vw`
--

DROP TABLE IF EXISTS `alarm_color_list_vw`;
/*!50001 DROP VIEW IF EXISTS `alarm_color_list_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `alarm_color_list_vw` (
  `id` tinyint NOT NULL,
  `item_name` tinyint NOT NULL,
  `item_value` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `alarm_color_vw`
--

DROP TABLE IF EXISTS `alarm_color_vw`;
/*!50001 DROP VIEW IF EXISTS `alarm_color_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `alarm_color_vw` (
  `id` tinyint NOT NULL,
  `ll_color` tinyint NOT NULL,
  `lo_color` tinyint NOT NULL,
  `norm_color` tinyint NOT NULL,
  `hi_color` tinyint NOT NULL,
  `hh_color` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `alarm_info`
--

DROP TABLE IF EXISTS `alarm_info`;
/*!50001 DROP VIEW IF EXISTS `alarm_info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `alarm_info` (
  `id` tinyint NOT NULL,
  `tag_id` tinyint NOT NULL,
  `alm_occurred` tinyint NOT NULL,
  `acknowledged` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `alarm_msg_id` tinyint NOT NULL,
  `priority` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `color` tinyint NOT NULL,
  `value` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `alarm_message`
--

DROP TABLE IF EXISTS `alarm_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alarm_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abbr` char(4) DEFAULT NULL COMMENT 'primarily for looking up',
  `message` char(128) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER almsg_bi_trg BEFORE INSERT ON alarm_message for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER almsg_bu_trg BEFORE UPDATE ON alarm_message for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `alarm_type`
--

DROP TABLE IF EXISTS `alarm_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alarm_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL DEFAULT '0' COMMENT '0 is lowest, priority increases',
  `alarm_msg_id` int(11) NOT NULL COMMENT 'default alarm message',
  `code` char(4) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `altype_msg_fk` (`alarm_msg_id`),
  CONSTRAINT `alarm_type_ibfk_1` FOREIGN KEY (`alarm_msg_id`) REFERENCES `alarm_message` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER altyp_bi_trg BEFORE INSERT ON alarm_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER altyp_bu_trg BEFORE UPDATE ON alarm_type for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `all_fields`
--

DROP TABLE IF EXISTS `all_fields`;
/*!50001 DROP VIEW IF EXISTS `all_fields`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_fields` (
  `id` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `parent_id` tinyint NOT NULL,
  `parent` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `analog_input`
--

DROP TABLE IF EXISTS `analog_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `analog_input` (
  `tag_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `type_code` char(3) NOT NULL COMMENT 'analog tag type',
  `scan_int` int(11) DEFAULT '60' COMMENT 'iterations between scans',
  `scan_offset` int(11) DEFAULT '0' COMMENT 'iteration offset from 0',
  `current_scan` int(11) DEFAULT '0' COMMENT 'current scan interation',
  `zero_value` double DEFAULT '0' COMMENT 'min point of input',
  `max_value` double DEFAULT '100' COMMENT 'max value of input',
  `hist_type_code` char(3) DEFAULT NULL COMMENT 'Boxcar/Linear/<null>',
  `percent` double DEFAULT '2' COMMENT 'percent variation allowed before hist logging',
  `slope` double DEFAULT '0' COMMENT 'slope of history value',
  `raw_value` double DEFAULT NULL COMMENT 'raw value (before scaling)',
  `scan_value` double DEFAULT NULL COMMENT 'value of most recent scan',
  `scan_time` datetime DEFAULT NULL COMMENT 'time of most recent scan',
  `prev_value` double DEFAULT NULL COMMENT 'value of previous scan',
  `prev_time` datetime DEFAULT NULL COMMENT 'time of previous scan',
  `last_hist_value` double DEFAULT NULL COMMENT 'last value stored in history file',
  `last_hist_time` datetime DEFAULT NULL COMMENT 'last time data stored in history file',
  `hh` double(12,4) DEFAULT NULL COMMENT 'high-high alarm limit',
  `hi` double(12,4) DEFAULT NULL COMMENT 'high alarm limit',
  `lo` double(12,4) DEFAULT NULL COMMENT 'low alarm limit',
  `ll` double(12,4) DEFAULT NULL COMMENT 'low-low alarm limit',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `ai_type_nuk` (`type_code`),
  KEY `ai_tag_fk` (`tag_id`),
  CONSTRAINT `analog_input_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ai_bi_trg BEFORE INSERT ON analog_input for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ai_bu_trg BEFORE UPDATE ON analog_input for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `analog_output`
--

DROP TABLE IF EXISTS `analog_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `analog_output` (
  `tag_id` int(11) NOT NULL,
  `history_type_id` int(11) DEFAULT NULL COMMENT 'future? everything is future',
  `scan_value` double DEFAULT NULL COMMENT 'value to output',
  `scan_time` datetime DEFAULT NULL COMMENT 'time output done',
  `zero_value` double DEFAULT NULL COMMENT 'minimum value output',
  `max_value` double DEFAULT NULL COMMENT 'maximum value output',
  `prev_value` double DEFAULT NULL COMMENT 'value of previous output',
  `prev_time` datetime DEFAULT NULL COMMENT 'time of previous output',
  `last_hist_value` double DEFAULT NULL COMMENT 'last value stored in history file',
  `last_hist_time` datetime DEFAULT NULL COMMENT 'last time data stored in history file',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `ao_tag_fk` (`tag_id`),
  KEY `ao_htype_fk` (`history_type_id`),
  CONSTRAINT `analog_output_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `analog_output_ibfk_2` FOREIGN KEY (`history_type_id`) REFERENCES `reference_code` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ao_bi_trg BEFORE INSERT ON analog_output for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ao_bu_trg BEFORE UPDATE ON analog_output for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `analog_type_vw`
--

DROP TABLE IF EXISTS `analog_type_vw`;
/*!50001 DROP VIEW IF EXISTS `analog_type_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `analog_type_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` char(30) DEFAULT NULL,
  `item_value` char(30) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER conf_bi_trg BEFORE INSERT ON config for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER conf_bu_trg BEFORE UPDATE ON config for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `content_type_vw`
--

DROP TABLE IF EXISTS `content_type_vw`;
/*!50001 DROP VIEW IF EXISTS `content_type_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `content_type_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(32) NOT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `etherkey` char(64) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER cust_bi_trg BEFORE INSERT ON customer for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER cust_bu_trg BEFORE UPDATE ON customer for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `digital_input`
--

DROP TABLE IF EXISTS `digital_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `digital_input` (
  `tag_id` int(11) NOT NULL,
  `scan_int` int(11) DEFAULT '60' COMMENT 'iterations between scans',
  `scan_offset` int(11) DEFAULT '0' COMMENT 'iteration offset from 0',
  `current_scan` int(11) DEFAULT '0' COMMENT 'current scan interation',
  `hist_type_code` char(3) DEFAULT NULL COMMENT 'one of the values of HIST_TYPE_VW',
  `scan_value` double DEFAULT NULL COMMENT 'value of most recent scan (0/1)',
  `scan_time` datetime DEFAULT NULL COMMENT 'time of most recent scan',
  `alarm_state` double DEFAULT NULL COMMENT 'value of alarm, null => no alarm',
  `alarm_code` double DEFAULT NULL COMMENT 'alarm code of alarm state',
  `prev_value` double DEFAULT NULL COMMENT 'value of previous scan',
  `prev_scan_time` datetime DEFAULT NULL COMMENT 'time of previous scan',
  `last_hist_value` double DEFAULT NULL COMMENT 'last value stored in history file',
  `last_hist_time` datetime DEFAULT NULL COMMENT 'last time data stored in history file',
  `value_view` char(30) DEFAULT NULL COMMENT 'view used to interpret value',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `di_tag_fk` (`tag_id`),
  CONSTRAINT `digital_input_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER di_bi_trg BEFORE INSERT ON digital_input for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER di_bu_trg BEFORE UPDATE ON digital_input for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `digital_output`
--

DROP TABLE IF EXISTS `digital_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `digital_output` (
  `tag_id` int(11) NOT NULL,
  `history_type_id` int(11) DEFAULT NULL COMMENT 'future? everything is future',
  `scan_value` double DEFAULT NULL COMMENT 'value to output (0/1)',
  `scan_time` datetime DEFAULT NULL COMMENT 'time of most recent scan',
  `alarm_state` double DEFAULT NULL COMMENT 'value of alarm, null => no alarm',
  `prev_value` double DEFAULT NULL COMMENT 'value of previous output',
  `prev_time` datetime DEFAULT NULL COMMENT 'time of previous output',
  `last_hist_value` double DEFAULT NULL COMMENT 'last value stored in history file',
  `last_hist_time` datetime DEFAULT NULL COMMENT 'last time data stored in history file',
  `value_view` char(30) DEFAULT NULL COMMENT 'view to interpret value',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `do_tag_fk` (`tag_id`),
  CONSTRAINT `digital_output_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER do_bi_trg BEFORE INSERT ON digital_output for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER do_bu_trg BEFORE UPDATE ON digital_output for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `dynamic_menu_items_vw`
--

DROP TABLE IF EXISTS `dynamic_menu_items_vw`;
/*!50001 DROP VIEW IF EXISTS `dynamic_menu_items_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `dynamic_menu_items_vw` (
  `text` tinyint NOT NULL,
  `order_no` tinyint NOT NULL,
  `uri` tinyint NOT NULL,
  `viewpriv` tinyint NOT NULL,
  `execpriv` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `menuname` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field` (
  `id` int(11) NOT NULL,
  `road_image` char(128) DEFAULT NULL,
  `satellite_image` char(128) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER fld_bi_trg BEFORE INSERT ON field for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER fld_bu_trg BEFORE UPDATE ON field for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `field_tag_deep_vw`
--

DROP TABLE IF EXISTS `field_tag_deep_vw`;
/*!50001 DROP VIEW IF EXISTS `field_tag_deep_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `field_tag_deep_vw` (
  `field_tag_id` tinyint NOT NULL,
  `child_tag_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `field_tag_vw`
--

DROP TABLE IF EXISTS `field_tag_vw`;
/*!50001 DROP VIEW IF EXISTS `field_tag_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `field_tag_vw` (
  `field_tag_id` tinyint NOT NULL,
  `child_tag_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `scan_value` double DEFAULT NULL COMMENT 'Digital values are 0 & 1',
  `scan_time` int(11) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hist_tag_nuk` (`tag_id`),
  KEY `hist_stime_nuk` (`scan_time`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=178761 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER hist_bi_trg BEFORE INSERT ON history for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER hist_bu_trg BEFORE UPDATE ON history for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `history_type_vw`
--

DROP TABLE IF EXISTS `history_type_vw`;
/*!50001 DROP VIEW IF EXISTS `history_type_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `history_type_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `horizontal_menu_vw`
--

DROP TABLE IF EXISTS `horizontal_menu_vw`;
/*!50001 DROP VIEW IF EXISTS `horizontal_menu_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `horizontal_menu_vw` (
  `id` tinyint NOT NULL,
  `menu_type_id` tinyint NOT NULL,
  `category_id` tinyint NOT NULL,
  `text` tinyint NOT NULL,
  `page_id` tinyint NOT NULL,
  `order_no` tinyint NOT NULL,
  `active` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `hot_spot`
--

DROP TABLE IF EXISTS `hot_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hot_spot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  `c1Lat` double(10,6) DEFAULT NULL,
  `c1Long` double(10,6) DEFAULT NULL,
  `c2Lat` double(10,6) DEFAULT NULL,
  `c2Long` double(10,6) DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  `optional_id` int(11) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hs_field_fk` (`field_id`),
  CONSTRAINT `hot_spot_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER hs_bi_trg BEFORE INSERT ON hot_spot for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER hs_bu_trg BEFORE UPDATE ON hot_spot for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_type_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `text` char(40) DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL,
  `active` char(1) DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_typ_fk` (`menu_type_id`),
  KEY `menu_cat_fk` (`category_id`),
  KEY `menu_page_fk` (`page_id`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`menu_type_id`) REFERENCES `reference_code` (`id`),
  CONSTRAINT `menu_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `menu_ibfk_3` FOREIGN KEY (`page_id`) REFERENCES `page` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER menu_bi_trg BEFORE INSERT ON menu for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER menu_bu_trg BEFORE UPDATE ON menu for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `menu_type_vw`
--

DROP TABLE IF EXISTS `menu_type_vw`;
/*!50001 DROP VIEW IF EXISTS `menu_type_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `menu_type_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `off_on_vw`
--

DROP TABLE IF EXISTS `off_on_vw`;
/*!50001 DROP VIEW IF EXISTS `off_on_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `off_on_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `on_off_vw`
--

DROP TABLE IF EXISTS `on_off_vw`;
/*!50001 DROP VIEW IF EXISTS `on_off_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `on_off_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) DEFAULT NULL,
  `uri` char(128) DEFAULT NULL,
  `view_priv_id` int(11) DEFAULT NULL COMMENT 'privilege required to view this page',
  `exec_priv_id` int(11) DEFAULT NULL COMMENT 'privilege required to execute this page',
  `active` char(1) DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `page_vw_priv_fk` (`view_priv_id`),
  KEY `page_ex_priv_fk` (`exec_priv_id`),
  CONSTRAINT `page_ibfk_1` FOREIGN KEY (`view_priv_id`) REFERENCES `privilege` (`id`),
  CONSTRAINT `page_ibfk_2` FOREIGN KEY (`exec_priv_id`) REFERENCES `privilege` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER page_bi_trg BEFORE INSERT ON page for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER page_bu_trg BEFORE UPDATE ON page for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `plot_group`
--

DROP TABLE IF EXISTS `plot_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plot_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(16) DEFAULT NULL,
  `id1` int(11) NOT NULL,
  `id2` int(11) NOT NULL,
  `id3` int(11) DEFAULT NULL,
  `id4` int(11) DEFAULT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pg_tag1_fk` (`id1`),
  KEY `pg_tag2_fk` (`id2`),
  KEY `pg_tag3_fk` (`id3`),
  KEY `pg_tag4_fk` (`id4`),
  CONSTRAINT `plot_group_ibfk_1` FOREIGN KEY (`id1`) REFERENCES `analog_input` (`tag_id`),
  CONSTRAINT `plot_group_ibfk_2` FOREIGN KEY (`id2`) REFERENCES `analog_input` (`tag_id`),
  CONSTRAINT `plot_group_ibfk_3` FOREIGN KEY (`id3`) REFERENCES `analog_input` (`tag_id`),
  CONSTRAINT `plot_group_ibfk_4` FOREIGN KEY (`id4`) REFERENCES `analog_input` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER pltgrp_bi_trg BEFORE INSERT ON plot_group for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER pltgrp_bu_trg BEFORE UPDATE ON plot_group for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER priv_bi_trg BEFORE INSERT ON privilege for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER priv_bu_trg BEFORE UPDATE ON privilege for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `process_unit`
--

DROP TABLE IF EXISTS `process_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER pu_bi_trg BEFORE INSERT ON process_unit for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER pu_bu_trg BEFORE UPDATE ON process_unit for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `reference_code`
--

DROP TABLE IF EXISTS `reference_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reference_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` char(30) DEFAULT NULL COMMENT 'category of reference',
  `name` char(30) DEFAULT NULL COMMENT 'short name',
  `code` char(3) DEFAULT NULL COMMENT 'really short name',
  `value` int(11) DEFAULT NULL COMMENT 'associated numerical value',
  `description` char(120) DEFAULT NULL COMMENT 'description of reference value',
  `active` char(1) DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `refcd_code_uk` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER rc_bi_trg BEFORE INSERT ON reference_code for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER rc_bu_trg BEFORE UPDATE ON reference_code for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rel_tag_tag`
--

DROP TABLE IF EXISTS `rel_tag_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rel_tag_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_tag_id` int(11) NOT NULL,
  `key_id` int(11) DEFAULT NULL COMMENT 'distinguishing field for multiple chains',
  `child_tag_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tag_key_fk` (`key_id`),
  KEY `tag_parent_fk` (`parent_tag_id`),
  KEY `tag_child_fk` (`child_tag_id`),
  CONSTRAINT `rel_tag_tag_ibfk_1` FOREIGN KEY (`key_id`) REFERENCES `reference_code` (`id`),
  CONSTRAINT `rel_tag_tag_ibfk_2` FOREIGN KEY (`parent_tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `rel_tag_tag_ibfk_3` FOREIGN KEY (`child_tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=835 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` char(1) DEFAULT 'Y',
  `parent_id` int(11) DEFAULT NULL,
  `name` char(30) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `role_ibfk_1` (`parent_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER role_bi_trg BEFORE INSERT ON role for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER role_bu_trg BEFORE UPDATE ON role for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `role_priv`
--

DROP TABLE IF EXISTS `role_priv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_priv` (
  `role_id` int(11) NOT NULL,
  `priv_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `rp_role_fk` (`role_id`),
  KEY `rp_priv_fk` (`priv_id`),
  CONSTRAINT `role_priv_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `role_priv_ibfk_2` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER rp_bi_trg BEFORE INSERT ON role_priv for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER rp_bu_trg BEFORE UPDATE ON role_priv for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) NOT NULL,
  `description` char(40) DEFAULT NULL,
  `tag_type_code` char(3) NOT NULL,
  `js_draw_file` char(120) DEFAULT NULL COMMENT 'path of file used to draw this object',
  `c1_lat` double(10,6) DEFAULT NULL COMMENT 'NW corner of object',
  `c1_long` double(10,6) DEFAULT NULL,
  `c2_lat` double(10,6) DEFAULT NULL COMMENT 'SE corner of object',
  `c2_long` double(10,6) DEFAULT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name_ui` (`name`),
  KEY `tag_type_fk` (`tag_type_code`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`tag_type_code`) REFERENCES `tag_type` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tag_bi_trg BEFORE INSERT ON tag for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tagxfer_ai_trg AFTER INSERT on tag for each row
begin
  if new.tag_type_code in ('AO','AI','DI','DO') then
    insert into xfer(id) values(new.id);
  end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tag_bu_trg BEFORE UPDATE ON tag for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tag_type`
--

DROP TABLE IF EXISTS `tag_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(3) NOT NULL,
  `name` char(30) NOT NULL,
  `description` char(120) DEFAULT NULL,
  `js_draw_file` char(120) DEFAULT NULL COMMENT 'path of file used to draw this object',
  `active` char(1) NOT NULL DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tt_code_ui` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tt_bi_trg BEFORE INSERT ON tag_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tt_bu_trg BEFORE UPDATE ON tag_type for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tank`
--

DROP TABLE IF EXISTS `tank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tank` (
  `id` int(11) NOT NULL,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `api` double(3,1) DEFAULT NULL,
  `density` double(4,3) DEFAULT NULL,
  `height` double(12,4) DEFAULT NULL,
  `diameter` double(12,6) DEFAULT NULL,
  `units` char(1) DEFAULT NULL COMMENT 'feet (f) or meters (m)',
  `content_type_code` char(4) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tank_bi_trg BEFORE INSERT ON tank for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tank_bu_trg BEFORE UPDATE ON tank for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `tank_level_vw`
--

DROP TABLE IF EXISTS `tank_level_vw`;
/*!50001 DROP VIEW IF EXISTS `tank_level_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tank_level_vw` (
  `tank_id` tinyint NOT NULL,
  `level_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `tank_ref_tag_row_vw`
--

DROP TABLE IF EXISTS `tank_ref_tag_row_vw`;
/*!50001 DROP VIEW IF EXISTS `tank_ref_tag_row_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tank_ref_tag_row_vw` (
  `id` tinyint NOT NULL,
  `child_tag_id` tinyint NOT NULL,
  `child` tinyint NOT NULL,
  `type_code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `value_text` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `tank_ref_tag_vw`
--

DROP TABLE IF EXISTS `tank_ref_tag_vw`;
/*!50001 DROP VIEW IF EXISTS `tank_ref_tag_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tank_ref_tag_vw` (
  `id` tinyint NOT NULL,
  `level_tag` tinyint NOT NULL,
  `level_tag_id` tinyint NOT NULL,
  `level` tinyint NOT NULL,
  `level_text` tinyint NOT NULL,
  `temp_tag` tinyint NOT NULL,
  `temp_tag_id` tinyint NOT NULL,
  `temp` tinyint NOT NULL,
  `temp_text` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `tank_tag_vw`
--

DROP TABLE IF EXISTS `tank_tag_vw`;
/*!50001 DROP VIEW IF EXISTS `tank_tag_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tank_tag_vw` (
  `parent_tag_id` tinyint NOT NULL,
  `child_tag_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `tank_temperature_vw`
--

DROP TABLE IF EXISTS `tank_temperature_vw`;
/*!50001 DROP VIEW IF EXISTS `tank_temperature_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tank_temperature_vw` (
  `tank_id` tinyint NOT NULL,
  `temperature_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `tf_vw`
--

DROP TABLE IF EXISTS `tf_vw`;
/*!50001 DROP VIEW IF EXISTS `tf_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `tf_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT '0',
  `transfer_type_id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `exp_start_time` datetime DEFAULT NULL,
  `exp_end_time` datetime DEFAULT NULL,
  `exp_volume` double(16,4) DEFAULT NULL,
  `delta` int(11) NOT NULL DEFAULT '0',
  `act_start_time` datetime DEFAULT NULL,
  `act_end_time` datetime DEFAULT NULL,
  `act_volume` double(16,4) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transfer_type_fk` (`transfer_type_id`),
  KEY `transfer_sts_fk` (`status_id`),
  KEY `transfer_src_id_fk` (`source_id`),
  KEY `transfer_dest_id_fk` (`destination_id`),
  CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`transfer_type_id`) REFERENCES `reference_code` (`id`),
  CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `reference_code` (`id`),
  CONSTRAINT `transfer_ibfk_3` FOREIGN KEY (`source_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `transfer_ibfk_4` FOREIGN KEY (`destination_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER transfer_bi_trg BEFORE INSERT ON transfer for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER transfer_bu_trg BEFORE UPDATE ON transfer for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `transfer_point`
--

DROP TABLE IF EXISTS `transfer_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfer_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` char(1) NOT NULL DEFAULT 'Y',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tp_bi_trg BEFORE INSERT ON transfer_point for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER tp_bu_trg BEFORE UPDATE ON transfer_point for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `transfer_status_vw`
--

DROP TABLE IF EXISTS `transfer_status_vw`;
/*!50001 DROP VIEW IF EXISTS `transfer_status_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `transfer_status_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `transfer_type_vw`
--

DROP TABLE IF EXISTS `transfer_type_vw`;
/*!50001 DROP VIEW IF EXISTS `transfer_type_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `transfer_type_vw` (
  `id` tinyint NOT NULL,
  `category` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `value` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `active` tinyint NOT NULL,
  `create_dt` tinyint NOT NULL,
  `last_modified_dt` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `transfer_vw`
--

DROP TABLE IF EXISTS `transfer_vw`;
/*!50001 DROP VIEW IF EXISTS `transfer_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `transfer_vw` (
  `id` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `type` tinyint NOT NULL,
  `source` tinyint NOT NULL,
  `destination` tinyint NOT NULL,
  `exp_start_time` tinyint NOT NULL,
  `exp_end_time` tinyint NOT NULL,
  `exp_volume` tinyint NOT NULL,
  `act_start_time` tinyint NOT NULL,
  `act_end_time` tinyint NOT NULL,
  `act_volume` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(12) DEFAULT NULL,
  `code` char(3) DEFAULT NULL,
  `unit_type_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unit_type_fk` (`unit_type_id`),
  CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`unit_type_id`) REFERENCES `unit_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER unit_bi_trg BEFORE INSERT ON unit for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER unit_bu_trg BEFORE UPDATE ON unit for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `unit_conversion`
--

DROP TABLE IF EXISTS `unit_conversion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit_conversion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `offset` double NOT NULL DEFAULT '0',
  `factor` double NOT NULL DEFAULT '1',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uc_to_fk` (`to_id`),
  KEY `uc_from_fk` (`from_id`),
  CONSTRAINT `unit_conversion_ibfk_1` FOREIGN KEY (`to_id`) REFERENCES `unit` (`id`),
  CONSTRAINT `unit_conversion_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER uc_bi_trg BEFORE INSERT ON unit_conversion for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER uc_bu_trg BEFORE UPDATE ON unit_conversion for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `unit_type`
--

DROP TABLE IF EXISTS `unit_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) DEFAULT NULL,
  `code` varchar(2) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER unittype_bi_trg BEFORE INSERT ON unit_type for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER unittype_bu_trg BEFORE UPDATE ON unit_type for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` char(30) DEFAULT NULL COMMENT 'nickname',
  `first_name` char(30) DEFAULT NULL,
  `middle_name` char(30) DEFAULT NULL,
  `last_name` char(60) DEFAULT NULL,
  `email` char(129) DEFAULT NULL,
  `password` char(40) DEFAULT NULL,
  `state` char(1) DEFAULT NULL COMMENT 'account request state: Active,Pending',
  `status` char(1) DEFAULT NULL COMMENT 'account active state: Yes, No',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER user_bi_trg BEFORE INSERT ON user for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER user_bu_trg BEFORE UPDATE ON user for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `user_priv`
--

DROP TABLE IF EXISTS `user_priv`;
/*!50001 DROP VIEW IF EXISTS `user_priv`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `user_priv` (
  `user` tinyint NOT NULL,
  `privilege` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `ur_role_fk` (`role_id`),
  KEY `ur_user_fk` (`user_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ur_bi_trg BEFORE INSERT ON user_role for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER ur_bu_trg BEFORE UPDATE ON user_role for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `vertical_menu_vw`
--

DROP TABLE IF EXISTS `vertical_menu_vw`;
/*!50001 DROP VIEW IF EXISTS `vertical_menu_vw`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vertical_menu_vw` (
  `id` tinyint NOT NULL,
  `menu_type_id` tinyint NOT NULL,
  `category_id` tinyint NOT NULL,
  `text` tinyint NOT NULL,
  `page_id` tinyint NOT NULL,
  `order_no` tinyint NOT NULL,
  `active` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vertices`
--

DROP TABLE IF EXISTS `vertices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vertices` (
  `obj_id` int(11) NOT NULL,
  `seq_no` int(11) NOT NULL,
  `latitude` double(10,6) DEFAULT NULL,
  `longitude` double(10,6) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  KEY `vert_field_fk` (`obj_id`),
  CONSTRAINT `vertices_ibfk_1` FOREIGN KEY (`obj_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vert_bi_trg BEFORE INSERT ON vertices for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vert_bu_trg BEFORE UPDATE ON vertices for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vessel`
--

DROP TABLE IF EXISTS `vessel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vessel` (
  `id` int(11) NOT NULL,
  `name` char(32) NOT NULL,
  `quantity` double DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vsl_cust_fk` (`customer_id`),
  CONSTRAINT `vessel_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vsl_bi_trg BEFORE INSERT ON vessel for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vsl_bu_trg BEFORE UPDATE ON vessel for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vessel_type`
--

DROP TABLE IF EXISTS `vessel_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vessel_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(16) NOT NULL,
  `code` char(3) NOT NULL,
  `quantity` double NOT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vsltype_bi_trg BEFORE INSERT ON vessel_type for each row
begin
  declare newID int;
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vsltype_bu_trg BEFORE UPDATE ON vessel_type for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `volume`
--

DROP TABLE IF EXISTS `volume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volume` (
  `tank_id` int(11) NOT NULL COMMENT 'id of tank',
  `level` double(4,2) NOT NULL DEFAULT '0.00',
  `volume` double(16,4) DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`tank_id`,`level`),
  CONSTRAINT `volume_ibfk_1` FOREIGN KEY (`tank_id`) REFERENCES `tank` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vol_bi_trg BEFORE INSERT ON volume for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER vol_bu_trg BEFORE UPDATE ON volume for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `watchdog`
--

DROP TABLE IF EXISTS `watchdog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watchdog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) DEFAULT NULL,
  `updated` int(11) DEFAULT '0',
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER wdog_bi_trg BEFORE INSERT ON watchdog for each row
begin
  if new.create_dt is null then
    set new.create_dt = now();
  end if;
  set new.last_modified_dt = now();
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 TRIGGER wdog_bu_trg BEFORE UPDATE ON watchdog for each row
  set new.last_modified_dt = now() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `xfer`
--

DROP TABLE IF EXISTS `xfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xfer` (
  `id` int(11) NOT NULL,
  `updated` int(11) DEFAULT '0' COMMENT '0 => not updated',
  `integer_value` int(11) DEFAULT '0',
  `float_value` float DEFAULT '0',
  `scan_time` datetime DEFAULT NULL,
  `create_dt` datetime DEFAULT NULL,
  `last_modified_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `xfer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `oms`.`xfer_BEFORE_INSERT` BEFORE INSERT ON `xfer` FOR EACH ROW
BEGIN
  if new.create_dt is null then set new.create_dt=now(); end if;
  set new.last_modified_dt = now();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`oms`@`%`*/ /*!50003 trigger xfer_bu_trg before update on xfer for each row set new.last_modified_dt = current_timestamp */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `active_vw`
--

/*!50001 DROP TABLE IF EXISTS `active_vw`*/;
/*!50001 DROP VIEW IF EXISTS `active_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `active_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'ACTIVE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `alarm_color_list_vw`
--

/*!50001 DROP TABLE IF EXISTS `alarm_color_list_vw`*/;
/*!50001 DROP VIEW IF EXISTS `alarm_color_list_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `alarm_color_list_vw` AS select 1 AS `id`,substr(`config`.`item_name`,1,(length(`config`.`item_name`) - 5)) AS `item_name`,`config`.`item_value` AS `item_value` from `config` where (`config`.`item_name` like '%COLOR') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `alarm_color_vw`
--

/*!50001 DROP TABLE IF EXISTS `alarm_color_vw`*/;
/*!50001 DROP VIEW IF EXISTS `alarm_color_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `alarm_color_vw` AS select `x`.`id` AS `id`,max((case when (`x`.`item_name` = 'LL') then `x`.`item_value` else NULL end)) AS `ll_color`,max((case when (`x`.`item_name` = 'LO') then `x`.`item_value` else NULL end)) AS `lo_color`,max((case when (`x`.`item_name` = 'NORM') then `x`.`item_value` else NULL end)) AS `norm_color`,max((case when (`x`.`item_name` = 'HI') then `x`.`item_value` else NULL end)) AS `hi_color`,max((case when (`x`.`item_name` = 'HH') then `x`.`item_value` else NULL end)) AS `hh_color` from `alarm_color_list_vw` `x` group by `x`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `alarm_info`
--

/*!50001 DROP TABLE IF EXISTS `alarm_info`*/;
/*!50001 DROP VIEW IF EXISTS `alarm_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `alarm_info` AS select `a`.`id` AS `id`,`a`.`tag_id` AS `tag_id`,`a`.`alm_occurred` AS `alm_occurred`,`a`.`acknowledged` AS `acknowledged`,`a`.`active` AS `active`,ifnull(`a`.`alarm_msg_id`,`at`.`alarm_msg_id`) AS `alarm_msg_id`,`at`.`priority` AS `priority`,`at`.`code` AS `code`,`acl`.`item_value` AS `color`,`ai`.`scan_value` AS `value` from (((`alarm` `a` join `alarm_type` `at` on((`a`.`alarm_type_id` = `at`.`id`))) join `alarm_color_list_vw` `acl` on((`at`.`code` = `acl`.`item_name`))) join `analog_input` `ai` on((`a`.`tag_id` = `ai`.`tag_id`))) where (`a`.`active` = 'Y') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_fields`
--

/*!50001 DROP TABLE IF EXISTS `all_fields`*/;
/*!50001 DROP VIEW IF EXISTS `all_fields`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `all_fields` AS select `f`.`id` AS `id`,`t`.`name` AS `name`,`f`.`id` AS `parent_id`,`t`.`name` AS `parent` from (`field` `f` join `tag` `t`) where ((`f`.`id` = `t`.`id`) and (`t`.`active` = 'Y') and (`t`.`tag_type_code` = 'FLD') and (not(`t`.`id` in (select `rel_tag_tag`.`child_tag_id` from `rel_tag_tag`)))) union select `t`.`id` AS `id`,`t`.`name` AS `name`,`tp`.`id` AS `pid`,`tp`.`name` AS `pname` from ((`rel_tag_tag` `rtt` join `tag` `t` on((`rtt`.`child_tag_id` = `t`.`id`))) join `tag` `tp` on((`rtt`.`parent_tag_id` = `tp`.`id`))) where ((`t`.`tag_type_code` = 'FLD') and (`tp`.`tag_type_code` = 'FLD')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `analog_type_vw`
--

/*!50001 DROP TABLE IF EXISTS `analog_type_vw`*/;
/*!50001 DROP VIEW IF EXISTS `analog_type_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `analog_type_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'ANALOG-TYPE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `content_type_vw`
--

/*!50001 DROP TABLE IF EXISTS `content_type_vw`*/;
/*!50001 DROP VIEW IF EXISTS `content_type_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `content_type_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'CONTENT-TYPE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `dynamic_menu_items_vw`
--

/*!50001 DROP TABLE IF EXISTS `dynamic_menu_items_vw`*/;
/*!50001 DROP VIEW IF EXISTS `dynamic_menu_items_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `dynamic_menu_items_vw` AS select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/processunit/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from ((`tag` `t` join `privilege` `p`) join `menu` `m`) where ((`t`.`tag_type_code` = 'PU') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Process Units') and (`m`.`text` = 'Process Units')) union select distinct `t`.`name` AS `text`,`t`.`id` AS `order_no`,concat('oms/field/',`t`.`id`) AS `uri`,`p`.`name` AS `viewpriv`,`p`.`name` AS `execpriv`,`m`.`text` AS `category`,replace(`t`.`name`,' ','') AS `menuname` from ((`tag` `t` join `privilege` `p`) join `menu` `m`) where ((`t`.`tag_type_code` = 'FLD') and (`t`.`active` = 'Y') and (`p`.`name` = 'View Fields') and (`m`.`text` = 'Field Displays')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `field_tag_deep_vw`
--

/*!50001 DROP TABLE IF EXISTS `field_tag_deep_vw`*/;
/*!50001 DROP VIEW IF EXISTS `field_tag_deep_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `field_tag_deep_vw` AS select `ft`.`field_tag_id` AS `field_tag_id`,`ft`.`child_tag_id` AS `child_tag_id` from (`field_tag_vw` `ft` join `tag` `t` on((`ft`.`child_tag_id` = `t`.`id`))) where (`t`.`tag_type_code` <> 'FLD') union select `ft1`.`field_tag_id` AS `field_tag_id`,`ft2`.`child_tag_id` AS `child_tag_id` from (((`field_tag_vw` `ft1` join `field_tag_vw` `ft2` on((`ft1`.`child_tag_id` = `ft2`.`field_tag_id`))) join `tag` `t1` on((`ft1`.`child_tag_id` = `t1`.`id`))) join `tag` `t2` on((`ft2`.`child_tag_id` = `t2`.`id`))) where (`t1`.`tag_type_code` = 'FLD') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `field_tag_vw`
--

/*!50001 DROP TABLE IF EXISTS `field_tag_vw`*/;
/*!50001 DROP VIEW IF EXISTS `field_tag_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `field_tag_vw` AS select `rt`.`parent_tag_id` AS `field_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from (`rel_tag_tag` `rt` join `tag` `t`) where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'FLD')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `history_type_vw`
--

/*!50001 DROP TABLE IF EXISTS `history_type_vw`*/;
/*!50001 DROP VIEW IF EXISTS `history_type_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `history_type_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'HISTORY-TYPE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `horizontal_menu_vw`
--

/*!50001 DROP TABLE IF EXISTS `horizontal_menu_vw`*/;
/*!50001 DROP VIEW IF EXISTS `horizontal_menu_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `horizontal_menu_vw` AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`menu` `m` join `reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'HT')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `menu_type_vw`
--

/*!50001 DROP TABLE IF EXISTS `menu_type_vw`*/;
/*!50001 DROP VIEW IF EXISTS `menu_type_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `menu_type_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'MENU_TYPE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `off_on_vw`
--

/*!50001 DROP TABLE IF EXISTS `off_on_vw`*/;
/*!50001 DROP VIEW IF EXISTS `off_on_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `off_on_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'OFF-ON') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `on_off_vw`
--

/*!50001 DROP TABLE IF EXISTS `on_off_vw`*/;
/*!50001 DROP VIEW IF EXISTS `on_off_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `on_off_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'ON-OFF') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tank_level_vw`
--

/*!50001 DROP TABLE IF EXISTS `tank_level_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tank_level_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tank_level_vw` AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `level_id` from ((`tank` `t` join `rel_tag_tag` `rtt`) join `analog_input` `ai`) where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`type_code` = 'L')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tank_ref_tag_row_vw`
--

/*!50001 DROP TABLE IF EXISTS `tank_ref_tag_row_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tank_ref_tag_row_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tank_ref_tag_row_vw` AS select `rtt`.`parent_tag_id` AS `id`,`t`.`id` AS `child_tag_id`,`t`.`name` AS `child`,`ai`.`type_code` AS `type_code`,`ai`.`scan_value` AS `value`,concat(format(`ai`.`scan_value`,2),' ',`u`.`code`) AS `value_text` from (((`rel_tag_tag` `rtt` join `tag` `t` on((`t`.`id` = `rtt`.`child_tag_id`))) join `analog_input` `ai` on((`t`.`id` = `ai`.`tag_id`))) join `unit` `u` on((`ai`.`unit_id` = `u`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tank_ref_tag_vw`
--

/*!50001 DROP TABLE IF EXISTS `tank_ref_tag_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tank_ref_tag_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tank_ref_tag_vw` AS select `trtrv`.`id` AS `id`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`child` end)) AS `level_tag`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`child_tag_id` end)) AS `level_tag_id`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`value` end)) AS `level`,max((case when (`trtrv`.`type_code` = 'L') then `trtrv`.`value_text` end)) AS `level_text`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`child` end)) AS `temp_tag`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`child_tag_id` end)) AS `temp_tag_id`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`value` end)) AS `temp`,max((case when (`trtrv`.`type_code` = 'T') then `trtrv`.`value_text` end)) AS `temp_text` from `tank_ref_tag_row_vw` `trtrv` group by `trtrv`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tank_tag_vw`
--

/*!50001 DROP TABLE IF EXISTS `tank_tag_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tank_tag_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tank_tag_vw` AS select `rt`.`parent_tag_id` AS `parent_tag_id`,`rt`.`child_tag_id` AS `child_tag_id` from (`rel_tag_tag` `rt` join `tag` `t`) where ((`rt`.`parent_tag_id` = `t`.`id`) and (`t`.`tag_type_code` = 'TK')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tank_temperature_vw`
--

/*!50001 DROP TABLE IF EXISTS `tank_temperature_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tank_temperature_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tank_temperature_vw` AS select `t`.`id` AS `tank_id`,`ai`.`tag_id` AS `temperature_id` from ((`tank` `t` join `rel_tag_tag` `rtt`) join `analog_input` `ai`) where ((`t`.`id` = `rtt`.`parent_tag_id`) and (`rtt`.`child_tag_id` = `ai`.`tag_id`) and (`ai`.`type_code` = 'T')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tf_vw`
--

/*!50001 DROP TABLE IF EXISTS `tf_vw`*/;
/*!50001 DROP VIEW IF EXISTS `tf_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `tf_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'TF') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transfer_status_vw`
--

/*!50001 DROP TABLE IF EXISTS `transfer_status_vw`*/;
/*!50001 DROP VIEW IF EXISTS `transfer_status_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `transfer_status_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'TRANSFER_STATUS') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transfer_type_vw`
--

/*!50001 DROP TABLE IF EXISTS `transfer_type_vw`*/;
/*!50001 DROP VIEW IF EXISTS `transfer_type_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `transfer_type_vw` AS select `reference_code`.`id` AS `id`,`reference_code`.`category` AS `category`,`reference_code`.`name` AS `name`,`reference_code`.`code` AS `code`,`reference_code`.`value` AS `value`,`reference_code`.`description` AS `description`,`reference_code`.`active` AS `active`,`reference_code`.`create_dt` AS `create_dt`,`reference_code`.`last_modified_dt` AS `last_modified_dt` from `reference_code` where (`reference_code`.`category` = 'TRANSFER_TYPE') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transfer_vw`
--

/*!50001 DROP TABLE IF EXISTS `transfer_vw`*/;
/*!50001 DROP VIEW IF EXISTS `transfer_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `transfer_vw` AS select `t`.`id` AS `id`,`t`.`name` AS `name`,`tsv`.`code` AS `status`,`ttv`.`code` AS `type`,`ts`.`name` AS `source`,`td`.`name` AS `destination`,`t`.`exp_start_time` AS `exp_start_time`,`t`.`exp_end_time` AS `exp_end_time`,`t`.`exp_volume` AS `exp_volume`,`t`.`act_start_time` AS `act_start_time`,`t`.`act_end_time` AS `act_end_time`,`t`.`act_volume` AS `act_volume` from ((((`transfer` `t` join `transfer_status_vw` `tsv` on((`t`.`status_id` = `tsv`.`id`))) join `transfer_type_vw` `ttv` on((`t`.`transfer_type_id` = `ttv`.`id`))) join `tag` `ts` on((`t`.`source_id` = `ts`.`id`))) join `tag` `td` on((`t`.`destination_id` = `td`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_priv`
--

/*!50001 DROP TABLE IF EXISTS `user_priv`*/;
/*!50001 DROP VIEW IF EXISTS `user_priv`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_priv` AS select `u`.`alias` AS `user`,`p`.`name` AS `privilege` from ((((`user` `u` join `role` `r`) join `user_role` `ur`) join `privilege` `p`) join `role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`)) union select `u`.`alias` AS `alias`,`p`.`name` AS `privilege` from ((((`user` `u` join `role` `r`) join `user_role` `ur`) join `privilege` `p`) join `role_priv` `rp`) where ((`ur`.`user_id` = `u`.`id`) and (`rp`.`role_id` = `r`.`id`) and (`rp`.`priv_id` = `p`.`id`) and `r`.`parent_id` in (select `r`.`id` from ((`user` `u` join `role` `r`) join `user_role` `ur`) where ((`ur`.`user_id` = `u`.`id`) and (`ur`.`role_id` = `r`.`id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vertical_menu_vw`
--

/*!50001 DROP TABLE IF EXISTS `vertical_menu_vw`*/;
/*!50001 DROP VIEW IF EXISTS `vertical_menu_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`oms`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vertical_menu_vw` AS select `m`.`id` AS `id`,`m`.`menu_type_id` AS `menu_type_id`,`m`.`category_id` AS `category_id`,`m`.`text` AS `text`,`m`.`page_id` AS `page_id`,`m`.`order_no` AS `order_no`,`m`.`active` AS `active` from (`menu` `m` join `reference_code` `rc` on((`m`.`menu_type_id` = `rc`.`id`))) where ((`rc`.`category` = 'MENU_TYPE') and (`rc`.`code` = 'VT')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-05 22:17:03
