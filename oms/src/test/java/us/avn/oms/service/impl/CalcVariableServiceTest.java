package us.avn.oms.service.impl;

import java.io.Reader;
import java.util.Collection;
import java.util.Iterator;

import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.CalcVariableMapper;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;



public class CalcVariableServiceTest {

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
	void shouldGetAllCVs() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			CalcVariableMapper mapper = sqlSession.getMapper(CalcVariableMapper.class);
			Collection<CalcVariable> ct = mapper.getAllCalcVariables();
			Assertions.assertNotNull(ct);
			Long noCalculated = Long.valueOf(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
		}
	}
	
	
/*
	@Test
	void shouldGetACalcVariable() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			CalcVariableMapper mapper = sqlSession.getMapper(CalcVariableMapper.class);
			Collection<CalcVariable> ct = mapper.getAllCalcVariables();
			Assertions.assertNotNull(ct);
			Long noCalculated = Long.valueOf(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<CalcVariable> ict = ct.iterator();
			CalcVariable cv = ict.next();
			CalcVariable tag = mapper.getCalcVariable(cv.getId());
			Assertions.assertNotNull(tag);
			userId = tag.getId();
			Assertions.assertEquals(cv.getId(), tag.getId());
		}
	}

	@Test
	void shouldGetACalcVariableByName() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			CalcVariableMapper mapper = sqlSession.getMapper(CalcVariableMapper.class);
			Collection<CalcVariable> ct = mapper.getAllCalcVariables();
			Assertions.assertNotNull(ct);
			Long noCalculated = Long.valueOf(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<CalcVariable> ict = ct.iterator();
			CalcVariable cv = ict.next();
			CalcVariable tag = mapper.getCalcVariableByName(cv.getTag().getName());
			Assertions.assertNotNull(tag);
			userId = tag.getId();
			System.out.println(tag);
			Assertions.assertEquals(cv.getId(), tag.getId());
		}
	}
*/
	
	@Test
	void shouldGetValuesForCalculation() {
		try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
			CalcVariableMapper mapper = sqlSession.getMapper(CalcVariableMapper.class);
			Collection<CalcVariable> ct = mapper.getAllCalcVariables();
			Assertions.assertNotNull(ct);
			Long noCalculated = Long.valueOf(ct.size());
			Assertions.assertNotEquals(0L,noCalculated);
			Iterator<CalcVariable> ict = ct.iterator();
			CalcVariable cv = ict.next();
			Collection<CalcOperand> cvScm = mapper.getValuesForCalculation(cv.getId());
			Assertions.assertNotNull(cvScm);
		}
	}


}
