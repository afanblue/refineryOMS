package us.avn.oms.service.impl;

import java.io.Reader;
import java.util.Collection;
import java.util.Iterator;

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmMessage;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.AlarmMapper;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;



public class AlarmMapperServiceTest {

	private static SqlSessionFactory sqlSessionFactory;

	private Long  userId;

	@BeforeAll
	static void setUp() {
		// create an SqlSessionFactory
		try (Reader reader = Resources.getResourceAsReader("config/mybatis-config.xml")) {
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
		} catch( Exception e ) {
			e.printStackTrace();
		}
	}

	@Test
	void shouldGetAlarmColors() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<Config> ct = mapper.getAlarmColors();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}
	
	@Test
	void shouldGetAllAlarmMessages() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<AlarmMessage> ct = mapper.getAllAlarmMsgs();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}

	@Test
	void shouldGetAlarmMessage() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<AlarmMessage> ct = mapper.getAllAlarmMsgs();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<AlarmMessage> ict = ct.iterator();
			AlarmMessage almsg = ict.next();
			AlarmMessage tag = mapper.getAlarmMessage(almsg.getId());
			Assertions.assertNotNull(tag);
			userId = tag.getId();
			Assertions.assertEquals(almsg.getId(), tag.getId());
		}
	}

	@Test
	void shouldGetAllAlarmTypees() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<AlarmType> ct = mapper.getAllAlarmTypes();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}

	@Test
	void shouldGetAlarmType() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<AlarmType> ct = mapper.getAllAlarmTypes();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<AlarmType> ict = ct.iterator();
			AlarmType almsg = ict.next();
			AlarmType tag = mapper.getAlarmType(almsg.getId());
			Assertions.assertNotNull(tag);
			userId = tag.getId();
			Assertions.assertEquals(almsg.getId(), tag.getId());
		}
	}

	@Test
	void shouldGetAllAlarms() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<Alarm> ct = mapper.getAllAlarms();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}

	@Test
	void shouldGetAllActiveAlarms() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<Alarm> ct = mapper.getAllActiveAlarms();
			Assertions.assertNotNull(ct);
			Long noCalculated = new Long(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}

	@Test
	void shouldGetTagAlarms() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			AlarmMapper mapper = sqlSession.getMapper(AlarmMapper.class);
			Collection<Alarm> ct = mapper.getAllActiveAlarms();
			Assertions.assertNotNull(ct);
			Long noAlarms = new Long(ct.size());
			Assertions.assertNotEquals(0L,noAlarms);
			Iterator<Alarm> ict = ct.iterator();
			Alarm alm1 = ict.next();
			Collection<Alarm> tagalms = mapper.getTagAlarms(alm1.getTagId());
			Assertions.assertNotNull(tagalms);
//			System.out.println("Tag in alarm: "+alm1.getTagId());
			noAlarms = new Long(tagalms.size());
			Assertions.assertNotEquals(0L,noAlarms);
//			System.out.println("Number tag alarms: "+noAlarms+" for "+alm1.getTagId());
			Iterator<Alarm> ictalm = tagalms.iterator();
			Alarm alm2 = ictalm.next();
			Assertions.assertEquals(alm1.getTagId(), alm2.getTagId());
		}
	}

}
